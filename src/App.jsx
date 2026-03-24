import { useState, useMemo, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
});

async function analyzePitchWithClaude(pitch) {
  const response = await fetch("/.netlify/functions/anthropic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Tu es un expert en festivals de cinéma. Analyse ce pitch de film et retourne UNIQUEMENT un objet JSON (sans balises markdown, sans texte avant ou après) avec les clés suivantes :

- formats: tableau parmi ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "série", "essai", "hybride"]
- genres: tableau parmi ["drame", "documentaire", "comédie", "thriller", "expérimental", "animation", "essai", "hybride", "social", "indépendant"]
- themes: tableau parmi ["société", "identité", "politique", "diaspora", "francophonie", "mémoire", "droits humains", "environnement", "art", "famille", "jeunesse"]
- langue: une valeur parmi ["français", "néerlandais", "anglais", ""] selon la langue probable du film
- resume: une phrase courte (max 20 mots) résumant les caractéristiques clés détectées

Pitch : "${pitch}"`
      }]
    })
  });
  const data = await response.json();
  const text = data.content.map(i => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

const PRESTIGE_COLOR = {
  "A+": "#E8920A",
  "A": "#FFFFFF",
  "B": "#4A6070",
};
const PRESTIGE_TEXT = {
  "A+": "#000000",
  "A": "#0A0A0A",
  "B": "#FFFFFF",
};

const PRESTIGE_LABEL = {
  "A+": "Incontournable",
  "A": "Majeur",
  "B": "Recommandé",
};

export default function ARPiFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [loadingFestivals, setLoadingFestivals] = useState(true);

  const [view, setView] = useState("matcher");
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [matchForm, setMatchForm] = useState({
    formats: [],
    genres: [],
    themes: [],
    langue: "",
    region: "",
    profil: [],
    specificites: [],
  });
  const [matchResults, setMatchResults] = useState(null);
  const [catalogueFilters, setCatalogueFilters] = useState({ region: "", prestige: "", cca: false });
  const [pitchState, setPitchState] = useState({ loading: false, resume: "", error: "" });
  const [userFestivals, setUserFestivals] = useState([]);

  // ── Chargement Firestore ──────────────────────────────────────────────────
  useEffect(() => {
    async function loadFestivals() {
      try {
        const snap = await getDocs(collection(db, "festivals"));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setFestivals(data);
      } catch (e) {
        console.error("Erreur chargement festivals Firestore:", e);
      } finally {
        setLoadingFestivals(false);
      }
    }
    loadFestivals();
  }, []);

  const toggle = (arr, val) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const handlePitchAnalyze = async (pitch) => {
    setPitchState({ loading: true, resume: "", error: "" });
    try {
      const result = await analyzePitchWithClaude(pitch);
      setMatchForm(f => ({
        ...f,
        formats: result.formats || [],
        genres: result.genres || [],
        themes: result.themes || [],
        langue: result.langue || "",
      }));
      setPitchState({ loading: false, resume: result.resume || "", error: "" });
    } catch (e) {
      setPitchState({ loading: false, resume: "", error: "Analyse impossible. Vérifiez votre connexion et réessayez." });
    }
  };

  const runMatch = () => {
    const ANIMATION_FORMATS = ["court-métrage animation", "long-métrage animation", "série animation"];
    const DOC_FORMATS = ["court-métrage documentaire", "long-métrage documentaire", "série documentaire"];
    const DOC_GENRES = ["documentaire", "essai"];

    const userWantsAnimation =
      matchForm.genres.includes("animation") ||
      matchForm.formats.some(f2 => ANIMATION_FORMATS.includes(f2));

    const userWantsDoc =
      matchForm.genres.some(g => DOC_GENRES.includes(g)) ||
      matchForm.formats.some(f2 => DOC_FORMATS.includes(f2));

    const scored = festivals.map(f => {
      let score = 0;
      let reasons = [];

      const festivalIsPureAnimation =
        f.formats.length > 0 &&
        f.formats.every(fmt => ANIMATION_FORMATS.includes(fmt));
      if (festivalIsPureAnimation && !userWantsAnimation) {
        return { ...f, score: 0, reasons: [] };
      }

      const festivalIsDocOnly =
        f.soumission?.plateforme === "DocFilmDepot" &&
        f.formats.every(fmt => DOC_FORMATS.includes(fmt));
      if (festivalIsDocOnly && !userWantsDoc) {
        return { ...f, score: 0, reasons: [] };
      }

      matchForm.formats.forEach(fmt => {
        if (f.formats.includes(fmt)) { score += 30; reasons.push(`Format : ${fmt}`); }
      });
      matchForm.genres.forEach(g => {
        if (g === "animation") {
          if (f.genres.includes("animation")) { score += 20; reasons.push(`Genre : ${g}`); }
        } else if (f.genres.includes(g) || f.genres.includes("tous genres") || f.genres.includes("tous genres court-métrage")) {
          score += 20; reasons.push(`Genre : ${g}`);
        }
      });
      matchForm.themes.forEach(t => {
        if (f.themes.includes(t) || f.themes.includes("tous thèmes")) { score += 15; reasons.push(`Thème : ${t}`); }
      });
      if (matchForm.langue && (f.langues.includes(matchForm.langue) || f.langues.includes("toutes langues"))) {
        score += 10; reasons.push(`Langue acceptée`);
      }
      if (matchForm.region && f.region === matchForm.region) { score += 10; reasons.push(`Ancrage géographique`); }
      if (matchForm.profil.length > 0 && matchForm.profil.some(p => f.profils.includes(p))) { score += 5; reasons.push(`Profil adapté`); }
      if (f.prestige === "A+") score += 5;

      return { ...f, score, reasons: [...new Set(reasons)] };
    })
      .filter(f => f.score > 0)
      .sort((a, b) => b.score - a.score);

    setMatchResults(scored);
    setView("results");
  };

  const filteredCatalogue = useMemo(() => {
    return festivals.filter(f => {
      if (catalogueFilters.region && f.region !== catalogueFilters.region) return false;
      if (catalogueFilters.prestige && f.prestige !== catalogueFilters.prestige) return false;
      if (catalogueFilters.cca && !f.cca) return false;
      return true;
    });
  }, [catalogueFilters, festivals]);

  // ── Loading screen ────────────────────────────────────────────────────────
  if (loadingFestivals) {
    return (
      <div style={{ ...styles.root, alignItems: "center", justifyContent: "center", minHeight: "100vh", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#E8920A", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>ARPi</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" }}>Chargement des festivals…</div>
      </div>
    );
  }

  if (view === "fiche" && selectedFestival) {
    return (
      <div style={styles.root}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a href="https://arpi-org.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
                <img src="https://arpi-org.com/wp-content/uploads/2024/07/LOGO-ARPI-2024-BLC.png" alt="ARPi" style={{ height: 44, width: "auto" }} />
              </a>
              <div style={{ ...styles.logoSub, marginTop: 0 }}>Plateforme Festivals</div>
            </div>
            <nav style={styles.nav}>
              {[
                { key: "matcher", label: "Matcher mon projet" },
                { key: "catalogue", label: "Catalogue" },
                { key: "outils", label: "Outils de soumission" },
                { key: "profil", label: "Mon profil" },
              ].map(n => (
                <button key={n.key} style={{ ...styles.navBtn }} onClick={() => setView(n.key)}>{n.label}</button>
              ))}
            </nav>
          </div>
        </header>
        <main style={styles.main}>
          <FicheFestival festival={selectedFestival} onBack={() => setView(matchResults ? "results" : "catalogue")} />
        </main>
        <footer style={styles.footer}>
          <span>ARPi — Association des Auteur·rice·s/Réalisateur·trice·s-Producteur·trice·s Indépendant·e·s</span>
          <span style={{ opacity: 0.4 }}>v2.0 — Belgique · Francophonie · International</span>
        </footer>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="https://arpi-org.com/wp-content/uploads/2024/07/LOGO-ARPI-2024-BLC.png" alt="ARPi" style={{ height: 44, width: "auto" }} />
            <div style={{ ...styles.logoSub, marginTop: 0 }}>Plateforme Festivals</div>
          </div>
          <nav style={styles.nav}>
            {[
              { key: "matcher", label: "Matcher mon projet" },
              { key: "catalogue", label: "Catalogue" },
              { key: "outils", label: "Outils de soumission" },
              { key: "profil", label: "Mon profil" },
            ].map(n => (
              <button
                key={n.key}
                style={{ ...styles.navBtn, ...(view === n.key || (view === "results" && n.key === "matcher") ? styles.navBtnActive : {}) }}
                onClick={() => setView(n.key)}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        {(view === "matcher") && <MatcherView matchForm={matchForm} setMatchForm={setMatchForm} toggle={toggle} runMatch={runMatch} onPitchAnalyze={handlePitchAnalyze} pitchState={pitchState} />}
        {view === "results" && matchResults && (
          <ResultsView results={matchResults} onSelect={f => { setSelectedFestival(f); setView("fiche"); }} onBack={() => setView("matcher")} />
        )}
        {view === "catalogue" && (
          <CatalogueView
            festivals={filteredCatalogue}
            filters={catalogueFilters}
            setFilters={setCatalogueFilters}
            onSelect={f => { setSelectedFestival(f); setView("fiche"); }}
          />
        )}
        {view === "profil" && (
          <ProfilView
            matchForm={matchForm}
            setMatchForm={setMatchForm}
            userFestivals={userFestivals}
            setUserFestivals={setUserFestivals}
            onGoMatcher={() => setView("matcher")}
          />
        )}
        {view === "outils" && <OutilsView />}
      </main>

      <footer style={styles.footer}>
        <span>ARPi — Association des Auteur·rice·s/Réalisateur·trice·s-Producteur·trice·s Indépendant·e·s</span>
        <span style={{ opacity: 0.4 }}>v2.0 — Belgique · Francophonie · International</span>
      </footer>
    </div>
  );
}


function MatcherView({ matchForm, setMatchForm, toggle, runMatch, onPitchAnalyze, pitchState }) {
  const [pitch, setPitch] = useState("");
  const canRun = matchForm.formats.length > 0 || matchForm.genres.length > 0;
  const canAnalyze = pitch.trim().length > 20 && !pitchState.loading;

  return (
    <div style={styles.matcherWrap}>
      <div style={styles.matcherIntro}>
        <h1 style={styles.h1}>Trouvez les festivals<br />adaptés à votre projet</h1>
        <p style={styles.intro}>Collez le pitch de votre film — Claude identifie les critères automatiquement. Vous pouvez ensuite affiner manuellement.</p>
      </div>
      <div style={styles.pitchBlock}>
        <div style={styles.pitchHeader}>
          <div style={styles.sectionTitle}>Pitch du film <span style={{ color: "#E8920A", fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>— analyse automatique par IA</span></div>
        </div>
        <textarea style={styles.pitchArea} placeholder="Collez ici le pitch ou synopsis de votre film (quelques lignes suffisent)..." value={pitch} onChange={e => setPitch(e.target.value)} rows={4} />
        <div style={styles.pitchActions}>
          <button style={{ ...styles.pitchBtn, opacity: canAnalyze ? 1 : 0.4, cursor: canAnalyze ? "pointer" : "not-allowed" }} onClick={canAnalyze ? () => onPitchAnalyze(pitch) : undefined}>
            {pitchState.loading ? "Analyse en cours..." : "Analyser le pitch"}
          </button>
          {pitchState.resume && <div style={styles.pitchResume}><span style={{ color: "#7B9E87", marginRight: 6 }}>Détecté :</span>{pitchState.resume}</div>}
          {pitchState.error && <div style={styles.pitchError}>{pitchState.error}</div>}
        </div>
      </div>
      <div style={styles.divider}><span style={styles.dividerLabel}>ou renseignez les critères manuellement</span></div>
      <div style={styles.matcherGrid}>
        <Section title="Format" required>
          <TagCloud options={["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "série", "essai", "hybride"]} selected={matchForm.formats} onToggle={v => setMatchForm(f => ({ ...f, formats: toggle(f.formats, v) }))} />
        </Section>
        <Section title="Genre / Forme">
          <TagCloud options={["drame", "documentaire", "comédie", "thriller", "expérimental", "animation", "essai", "hybride", "social", "indépendant"]} selected={matchForm.genres} onToggle={v => setMatchForm(f => ({ ...f, genres: toggle(f.genres, v) }))} />
        </Section>
        <Section title="Thèmes">
          <TagCloud options={["société", "identité", "politique", "diaspora", "francophonie", "mémoire", "droits humains", "environnement", "art", "famille", "jeunesse"]} selected={matchForm.themes} onToggle={v => setMatchForm(f => ({ ...f, themes: toggle(f.themes, v) }))} />
        </Section>
        <div style={styles.matcherRow}>
          <Section title="Langue du film">
            <select style={styles.select} value={matchForm.langue} onChange={e => setMatchForm(f => ({ ...f, langue: e.target.value }))}>
              <option value="">Toutes</option>
              <option value="français">Français</option>
              <option value="néerlandais">Néerlandais</option>
              <option value="anglais">Anglais</option>
            </select>
          </Section>
          <Section title="Ancrage géographique prioritaire">
            <select style={styles.select} value={matchForm.region} onChange={e => setMatchForm(f => ({ ...f, region: e.target.value }))}>
              <option value="">Tous</option>
              <option value="belgique">Belgique</option>
              <option value="francophonie">Francophonie internationale</option>
              <option value="international">International</option>
            </select>
          </Section>
          <Section title="Votre profil">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ val: "réalisateur", label: "Réalisateur·trice" }, { val: "producteur", label: "Producteur·trice" }, { val: "auteur", label: "Auteur·rice" }].map(opt => (
                <label key={opt.val} style={styles.checkLabel}>
                  <input type="checkbox" style={styles.checkInput} checked={matchForm.profil.includes(opt.val)} onChange={() => setMatchForm(f => ({ ...f, profil: toggle(f.profil, opt.val) }))} />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </Section>
        </div>
        <Section title="Spécificités personnelles">
          <div style={{ marginBottom: 6, fontSize: 12, opacity: 0.45, fontStyle: "italic" }}>Certains festivals proposent des sections ou prix dédiés — ces critères affinent le matching.</div>
          <TagCloud options={["issu·e de la diversité", "jeune créateur·trice (- de 35 ans)", "premier film", "cinéaste femme", "cinéaste LGBTQ+", "film à petit budget"]} selected={matchForm.specificites} onToggle={v => setMatchForm(f => ({ ...f, specificites: toggle(f.specificites, v) }))} />
        </Section>
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button style={{ ...styles.matchBtn, opacity: canRun ? 1 : 0.4, cursor: canRun ? "pointer" : "not-allowed" }} onClick={canRun ? runMatch : undefined}>Lancer le matching</button>
        {!canRun && <p style={{ marginTop: 12, opacity: 0.5, fontSize: 13 }}>Analysez votre pitch ou sélectionnez au moins un format</p>}
      </div>
    </div>
  );
}

function ResultsView({ results, onSelect, onBack }) {
  return (
    <div style={styles.resultsWrap}>
      <div style={styles.resultsHeader}>
        <button style={styles.backBtn} onClick={onBack}>← Modifier la recherche</button>
        <div>
          <h2 style={styles.h2}>{results.length} festival{results.length > 1 ? "s" : ""} correspondant{results.length > 1 ? "s" : ""}</h2>
          <p style={{ opacity: 0.5, fontSize: 13, marginTop: 4 }}>Classés par pertinence décroissante</p>
        </div>
      </div>
      <div style={styles.resultsList}>
        {results.map((f, i) => <ResultCard key={f.id} festival={f} rank={i + 1} onSelect={() => onSelect(f)} />)}
      </div>
    </div>
  );
}

function ResultCard({ festival: f, rank, onSelect }) {
  const pct = Math.min(100, Math.round((f.score / 100) * 100));
  return (
    <div style={styles.resultCard} onClick={onSelect}>
      <div style={styles.resultRank}>#{rank}</div>
      <div style={{ flex: 1 }}>
        <div style={styles.resultTop}>
          <div>
            <div style={styles.resultName}>{f.nom}</div>
            <div style={styles.resultMeta}>{f.ville}, {f.pays} — {f.edition}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ ...styles.prestigeBadge, background: PRESTIGE_COLOR[f.prestige], color: PRESTIGE_TEXT[f.prestige] }}>{PRESTIGE_LABEL[f.prestige]}</span>
            <div style={styles.scoreCircle}>{f.score}</div>
          </div>
        </div>
        <div style={styles.matchBar}><div style={{ ...styles.matchBarFill, width: `${pct}%` }} /></div>
        <div style={styles.reasons}>{f.reasons.map(r => <span key={r} style={styles.reasonTag}>{r}</span>)}</div>
        <div style={styles.resultFooter}>
          <span style={styles.deadlineLabel}>Deadline : <strong>{f.deadline}</strong></span>
          <span style={styles.feesLabel}>{f.frais}</span>
          {f.soumission && <a href={f.soumission.url} target="_blank" rel="noreferrer" style={styles.soumissionPill}>{f.soumission.plateforme}</a>}
          <button style={styles.ficheBtn}>Voir la fiche →</button>
        </div>
      </div>
    </div>
  );
}

function CatalogueView({ festivals, filters, setFilters, onSelect }) {
  return (
    <div style={styles.catalogueWrap}>
      <div style={styles.catalogueHeader}>
        <h2 style={styles.h2}>Catalogue des festivals</h2>
        <div style={styles.catalogueFilters}>
          <select style={styles.select} value={filters.region} onChange={e => setFilters(f => ({ ...f, region: e.target.value }))}>
            <option value="">Toutes régions</option>
            <option value="belgique">Belgique</option>
            <option value="francophonie">Francophonie</option>
            <option value="international">International</option>
          </select>
          <select style={styles.select} value={filters.prestige} onChange={e => setFilters(f => ({ ...f, prestige: e.target.value }))}>
            <option value="">Tous niveaux</option>
            <option value="A+">Incontournable</option>
            <option value="A">Majeur</option>
            <option value="B">Recommandé</option>
          </select>
          <button style={{ ...styles.ccaFilterBtn, ...(filters.cca ? styles.ccaFilterBtnActive : {}) }} onClick={() => setFilters(f => ({ ...f, cca: !f.cca }))}>Aide CCA uniquement</button>
        </div>
      </div>
      <div style={styles.catalogueGrid}>
        {festivals.map(f => <CatalogueCard key={f.id} festival={f} onSelect={() => onSelect(f)} />)}
      </div>
    </div>
  );
}

function CatalogueCard({ festival: f, onSelect }) {
  const regionLabel = f.region === "belgique" ? "BE" : f.region === "francophonie" ? "FR+" : "INT";
  return (
    <div style={styles.catCard} onClick={onSelect}>
      <div style={styles.catCardTop}>
        <span style={{ ...styles.prestigeBadge, background: PRESTIGE_COLOR[f.prestige], color: PRESTIGE_TEXT[f.prestige] }}>{PRESTIGE_LABEL[f.prestige]}</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {f.cca && <span style={styles.ccaBadge}>CCA</span>}
          <span style={styles.regionTag}>{regionLabel}</span>
        </div>
      </div>
      <div style={styles.catName}>{f.nom}</div>
      <div style={styles.catMeta}>{f.ville}, {f.pays}</div>
      <div style={styles.catEdition}>{f.edition}</div>
      <div style={styles.catFormats}>
        {f.formats.slice(0, 2).map(fmt => <span key={fmt} style={styles.fmtTag}>{fmt}</span>)}
        {f.formats.length > 2 && <span style={styles.fmtTag}>+{f.formats.length - 2}</span>}
      </div>
      <div style={styles.catDeadline}>Deadline : {f.deadline}</div>
    </div>
  );
}

function FicheFestival({ festival: f, onBack }) {
  const regionLabel = f.region === "belgique" ? "Belgique" : f.region === "francophonie" ? "Francophonie" : "International";
  return (
    <div style={styles.ficheWrap}>
      <button style={styles.backBtn} onClick={onBack}>← Retour</button>
      <div style={styles.ficheHeader}>
        <div>
          <div style={styles.fichePrestige}>
            <span style={{ ...styles.prestigeBadge, background: PRESTIGE_COLOR[f.prestige], color: PRESTIGE_TEXT[f.prestige] }}>{PRESTIGE_LABEL[f.prestige]}</span>
            <span style={styles.regionTag}>{regionLabel}</span>
            {f.cca && <span style={styles.ccaBadgeLg}>Éligible aide CCA</span>}
          </div>
          <h1 style={styles.ficheTitre}>{f.nom}</h1>
          <div style={styles.ficheMeta}>{f.ville}, {f.pays} — {f.edition}</div>
        </div>
        <a href={f.site} target="_blank" rel="noreferrer" style={styles.siteBtn}>Visiter le site →</a>
      </div>
      <div style={styles.ficheBody}>
        <div style={styles.ficheCol}>
          <FicheBlock titre="Description"><p style={{ lineHeight: 1.7, opacity: 0.85 }}>{f.description}</p></FicheBlock>
          <FicheBlock titre="Formats acceptés"><div style={styles.tagRow}>{f.formats.map(fmt => <span key={fmt} style={styles.fmtTagLg}>{fmt}</span>)}</div></FicheBlock>
          <FicheBlock titre="Genres & formes"><div style={styles.tagRow}>{f.genres.map(g => <span key={g} style={styles.genreTag}>{g}</span>)}</div></FicheBlock>
          <FicheBlock titre="Thèmes"><div style={styles.tagRow}>{f.themes.map(t => <span key={t} style={styles.themeTag}>{t}</span>)}</div></FicheBlock>
        </div>
        <div style={styles.ficheSide}>
          <div style={styles.ficheSideCard}>
            <FicheStat label="Deadline de soumission" value={f.deadline} accent />
            <FicheStat label="Édition" value={f.edition} />
            <FicheStat label="Frais d'inscription" value={f.frais} />
            <FicheStat label="Langues acceptées" value={(f.langues || []).join(", ")} />
            <FicheStat label="Profils concernés" value={(f.profils || []).join(", ")} />
            {(f.accreditations || []).length > 0 && <FicheStat label="Accréditations" value={f.accreditations.join(", ")} />}
            {f.soumission && (
              <div style={styles.ficheSoumission}>
                <div style={styles.ficheStatLabel}>Soumettre via</div>
                <div style={styles.soumissionPlateforme}>{f.soumission.plateforme}</div>
                <div style={styles.soumissionNote}>{f.soumission.note}</div>
                <a href={f.soumission.url} target="_blank" rel="noreferrer" style={styles.soumissionBtn}>Accéder à la plateforme →</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FicheBlock({ titre, children }) {
  return <div style={{ marginBottom: 28 }}><div style={styles.ficheBlockTitre}>{titre}</div>{children}</div>;
}

function FicheStat({ label, value, accent }) {
  return (
    <div style={styles.ficheStat}>
      <div style={styles.ficheStatLabel}>{label}</div>
      <div style={{ ...styles.ficheStatValue, color: accent ? "#E8920A" : "inherit" }}>{value}</div>
    </div>
  );
}

function Section({ title, required, children }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionTitle}>{title}{required && <span style={styles.required}> *</span>}</div>
      {children}
    </div>
  );
}

function TagCloud({ options, selected, onToggle }) {
  return (
    <div style={styles.tagCloud}>
      {options.map(o => (
        <button key={o} style={{ ...styles.tag, ...(selected.includes(o) ? styles.tagActive : {}) }} onClick={() => onToggle(o)}>{o}</button>
      ))}
    </div>
  );
}

const OUTILS = [
  { id: "filmfreeway", nom: "FilmFreeway", url: "https://filmfreeway.com", logo: "FF", couleur: "#1DB954", type: "Soumission", formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "série", "expérimental"], perimetre: "International — plus de 12 000 festivals", langue: "Anglais / Multilingue", tarif: "Gratuit pour les cinéastes. Frais selon les festivals.", ethique: false, description: "Plateforme de référence mondiale pour la soumission en festivals. Couvre tous les formats et toutes les régions.", forces: ["Catalogue mondial (12 000+ festivals)", "Gratuit pour soumettre", "Tous formats et durées"], limites: ["Interface en anglais", "Pas de charte éthique", "Concurrence élevée"], ideal: "Tout cinéaste cherchant une diffusion internationale." },
  { id: "shortfilmdepot", nom: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", logo: "SFD", couleur: "#4A7C6F", type: "Soumission", formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "expérimental"], perimetre: "International — forte présence francophone", langue: "Français / Anglais", tarif: "Tarifs par festival. Gratuit pour certains.", ethique: true, description: "Plateforme indépendante administrée par Sauve Qui Peut le Court Métrage. Interface en français, charte éthique.", forces: ["Court-métrage toutes formes", "Charte éthique", "Interface en français"], limites: ["Court-métrage uniquement", "Pas de long-métrage"], ideal: "Réalisateurs cherchant à diffuser leurs courts-métrages en festivals engagés." },
  { id: "docfilmdepot", nom: "DocFilmDepot", url: "https://www.docfilmdepot.com", logo: "DFD", couleur: "#6B5B8A", type: "Soumission", formats: ["long-métrage documentaire", "court-métrage documentaire", "essai", "série documentaire"], perimetre: "International — ancrage francophone fort", langue: "Français", tarif: "Système de timbres numériques.", ethique: false, description: "Développée par Ardèche Images. Plateforme de référence pour le documentaire francophone.", forces: ["Documentaire toutes formes", "Réseau francophone solide", "Interface simple"], limites: ["Documentaire principalement", "Moins de festivals anglophones"], ideal: "Réalisateurs et producteurs de documentaires cherchant les festivals francophones majeurs." },
  { id: "festhome", nom: "Festhome", url: "https://festhome.com", logo: "FH", couleur: "#2A6496", type: "Soumission", formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "long-métrage fiction", "long-métrage documentaire"], perimetre: "International — forte présence européenne", langue: "Français / Anglais / Espagnol", tarif: "Gratuit pour les cinéastes. 20 Go de stockage inclus.", ethique: false, description: "Plateforme européenne de soumission en festivals. Interface multilingue, stockage gratuit de 20 Go. Bien implantée en Belgique et en Europe.", forces: ["Gratuit pour les cinéastes", "20 Go de stockage inclus", "Interface multilingue", "Bonne couverture belge et européenne"], limites: ["Moins de festivals qu'FilmFreeway", "Moins connu hors Europe"], ideal: "Cinéastes belges et européens cherchant une alternative gratuite à FilmFreeway avec une interface en français." },
  { id: "cinando", nom: "Cinando", url: "https://cinando.com", logo: "CND", couleur: "#1A3A5C", type: "Réseau professionnel B2B", formats: ["long-métrage fiction", "long-métrage documentaire", "série"], perimetre: "International — lié au Marché du Film de Cannes", langue: "Français / Anglais", tarif: "Abonnement annuel.", ethique: false, description: "Plateforme de réseautage B2B pour les professionnels. Pas une plateforme de soumission directe.", forces: ["Réseau mondial de l'industrie", "Base de données exhaustive", "Marché du Film intégré"], limites: ["Pas de soumission directe", "Payant", "Orienté vente"], ideal: "Producteurs cherchant des partenaires de coproduction ou de distribution." },
];

function OutilsView() {
  const [selected, setSelected] = useState(null);
  const outil = selected ? OUTILS.find(o => o.id === selected) : null;
  return (
    <div style={styles.outilsWrap}>
      <div style={styles.outilsIntro}>
        <h2 style={styles.h2}>Outils de soumission</h2>
        <p style={{ opacity: 0.6, fontSize: 14, marginTop: 8, lineHeight: 1.7, maxWidth: 640 }}>Ces plateformes complémentaires permettent de soumettre vos films aux festivals ou de renforcer votre positionnement professionnel.</p>
      </div>
      <div style={styles.outilsGrid}>
        {OUTILS.map(o => (
          <div key={o.id} style={{ ...styles.outilCard, ...(selected === o.id ? styles.outilCardActive : {}), borderLeftColor: o.couleur }} onClick={() => setSelected(selected === o.id ? null : o.id)}>
            <div style={styles.outilCardTop}>
              <div style={{ ...styles.outilLogo, background: o.couleur }}>{o.logo}</div>
              <div style={{ flex: 1 }}><div style={styles.outilNom}>{o.nom}</div><div style={styles.outilType}>{o.type}</div></div>
              {o.ethique && <span style={styles.ethiqueBadge}>Charte éthique</span>}
            </div>
            <div style={styles.outilFormats}>{o.formats.slice(0, 3).map(f => <span key={f} style={styles.fmtTag}>{f}</span>)}{o.formats.length > 3 && <span style={styles.fmtTag}>+{o.formats.length - 3}</span>}</div>
            <div style={styles.outilTarif}>{o.tarif}</div>
          </div>
        ))}
      </div>
      {outil && (
        <div style={styles.outilDetail}>
          <div style={styles.outilDetailHeader}>
            <div style={{ ...styles.outilLogo, background: outil.couleur, width: 52, height: 52, fontSize: 15 }}>{outil.logo}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{outil.nom}</div><div style={{ opacity: 0.5, fontSize: 13 }}>{outil.perimetre} — {outil.langue}</div></div>
            <a href={outil.url} target="_blank" rel="noreferrer" style={styles.siteBtn}>Accéder →</a>
          </div>
          <p style={{ lineHeight: 1.75, opacity: 0.85, marginBottom: 24, fontSize: 14 }}>{outil.description}</p>
          <div style={styles.outilDetailGrid}>
            <div><div style={styles.ficheBlockTitre}>Formats couverts</div><div style={styles.tagRow}>{outil.formats.map(f => <span key={f} style={styles.fmtTagLg}>{f}</span>)}</div></div>
            <div><div style={styles.ficheBlockTitre}>Points forts</div><ul style={{ margin: 0, padding: "0 0 0 16px", lineHeight: 2, opacity: 0.8, fontSize: 13 }}>{outil.forces.map(f => <li key={f}>{f}</li>)}</ul></div>
            <div><div style={styles.ficheBlockTitre}>Limites</div><ul style={{ margin: 0, padding: "0 0 0 16px", lineHeight: 2, opacity: 0.6, fontSize: 13 }}>{outil.limites.map(l => <li key={l}>{l}</li>)}</ul></div>
            <div><div style={styles.ficheBlockTitre}>Idéal pour</div><p style={{ opacity: 0.8, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{outil.ideal}</p></div>
          </div>
        </div>
      )}
      <div style={styles.outilsNote}>La plateforme ARPi identifie, pour chaque festival du catalogue, la plateforme de soumission recommandée. Ces informations apparaissent dans les fiches festival et dans les résultats de matching.</div>
    </div>
  );
}

function ProfilView({ matchForm, setMatchForm, userFestivals, setUserFestivals, onGoMatcher }) {
  const toggle = (arr, val) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
  const emptyForm = { nom: "", ville: "", pays: "", site: "", formats: "", deadline: "", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("profil");

  const handleSubmit = () => {
    if (!form.nom.trim()) return;
    const nouveau = { id: Date.now(), ...form, source: "membre", dateAjout: new Date().toLocaleDateString("fr-BE") };
    setUserFestivals(prev => [nouveau, ...prev]);
    setForm(emptyForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={styles.profilWrap}>
      <div style={styles.profilHeader}><h2 style={styles.h2}>Mon profil</h2><p style={{ opacity: 0.5, fontSize: 14, marginTop: 6 }}>Vos préférences sont mémorisées pour affiner vos prochaines recherches.</p></div>
      <div style={styles.profilTabs}>
        {[{ key: "profil", label: "Profil & préférences" }, { key: "proposer", label: "Proposer un festival" }].map(t => (
          <button key={t.key} style={{ ...styles.profilTab, ...(activeTab === t.key ? styles.profilTabActive : {}) }} onClick={() => setActiveTab(t.key)}>
            {t.label}{t.key === "proposer" && userFestivals.length > 0 && <span style={styles.profilBadge}>{userFestivals.length}</span>}
          </button>
        ))}
      </div>
      {activeTab === "profil" && (
        <div style={styles.profilContent}>
          <div style={styles.profilGrid}>
            <div style={styles.profilCard}>
              <div style={styles.profilCardTitre}>Rôle principal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[{ val: "réalisateur", label: "Réalisateur·trice" }, { val: "producteur", label: "Producteur·trice" }, { val: "auteur", label: "Auteur·rice" }].map(opt => (
                  <label key={opt.val} style={styles.radioRow}><input type="radio" name="profil" value={opt.val} checked={matchForm.profil === opt.val} onChange={() => setMatchForm(f => ({ ...f, profil: opt.val }))} style={{ accentColor: "#E8920A" }} /><span style={{ marginLeft: 10 }}>{opt.label}</span></label>
                ))}
                <label style={styles.radioRow}><input type="radio" name="profil" value="" checked={matchForm.profil === ""} onChange={() => setMatchForm(f => ({ ...f, profil: "" }))} style={{ accentColor: "#E8920A" }} /><span style={{ marginLeft: 10, opacity: 0.5 }}>Non précisé</span></label>
              </div>
            </div>
            <div style={styles.profilCard}>
              <div style={styles.profilCardTitre}>Spécificités personnelles</div>
              <div style={{ fontSize: 12, opacity: 0.45, marginBottom: 14, fontStyle: "italic", lineHeight: 1.5 }}>Ces critères permettent d'identifier les festivals avec sections ou prix dédiés.</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["issu·e de la diversité", "jeune créateur·trice (- de 35 ans)", "premier film", "cinéaste femme", "cinéaste LGBTQ+", "film à petit budget"].map(spec => (
                  <button key={spec} style={{ ...styles.tag, ...(matchForm.specificites?.includes(spec) ? styles.tagActive : {}), fontSize: 12 }} onClick={() => setMatchForm(f => ({ ...f, specificites: toggle(f.specificites || [], spec) }))}>{spec}</button>
                ))}
              </div>
            </div>
            <div style={styles.profilCard}>
              <div style={styles.profilCardTitre}>Ancrage géographique prioritaire</div>
              <select style={{ ...styles.select, marginTop: 4 }} value={matchForm.region} onChange={e => setMatchForm(f => ({ ...f, region: e.target.value }))}>
                <option value="">Tous</option>
                <option value="belgique">Belgique</option>
                <option value="francophonie">Francophonie internationale</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}><button style={styles.matchBtn} onClick={onGoMatcher}>Lancer une recherche avec ce profil</button></div>
        </div>
      )}
      {activeTab === "proposer" && (
        <div style={styles.profilContent}>
          <div style={styles.proposeIntro}><p style={{ opacity: 0.7, lineHeight: 1.7, fontSize: 14 }}>Vous connaissez un festival qui n'est pas encore référencé ? Signalez-le ici. L'équipe ARPi examinera votre suggestion.</p></div>
          <div style={styles.proposeForm}>
            <div style={styles.proposeRow}>
              <div style={styles.proposeField}><label style={styles.proposeLabel}>Nom du festival *</label><input style={styles.proposeInput} placeholder="ex. Festival du Film de Ouagadougou" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} /></div>
              <div style={styles.proposeField}><label style={styles.proposeLabel}>Site web</label><input style={styles.proposeInput} placeholder="https://..." value={form.site} onChange={e => setForm(f => ({ ...f, site: e.target.value }))} /></div>
            </div>
            <div style={styles.proposeRow}>
              <div style={styles.proposeField}><label style={styles.proposeLabel}>Ville</label><input style={styles.proposeInput} value={form.ville} onChange={e => setForm(f => ({ ...f, ville: e.target.value }))} /></div>
              <div style={styles.proposeField}><label style={styles.proposeLabel}>Pays</label><input style={styles.proposeInput} value={form.pays} onChange={e => setForm(f => ({ ...f, pays: e.target.value }))} /></div>
              <div style={styles.proposeField}><label style={styles.proposeLabel}>Deadline</label><input style={styles.proposeInput} placeholder="ex. Juin 2026" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} /></div>
            </div>
            <div style={styles.proposeField}><label style={styles.proposeLabel}>Formats acceptés</label><input style={styles.proposeInput} placeholder="ex. documentaire, court-métrage..." value={form.formats} onChange={e => setForm(f => ({ ...f, formats: e.target.value }))} /></div>
            <div style={styles.proposeField}><label style={styles.proposeLabel}>Notes / contexte</label><textarea style={{ ...styles.proposeInput, minHeight: 80, resize: "vertical" }} placeholder="Pourquoi ce festival est-il pertinent pour les membres ARPi ?" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} /></div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
              <button style={{ ...styles.matchBtn, opacity: form.nom.trim() ? 1 : 0.4 }} onClick={form.nom.trim() ? handleSubmit : undefined}>Soumettre la suggestion</button>
              {submitted && <span style={{ color: "#7B9E87", fontSize: 13 }}>Suggestion enregistrée — merci pour votre contribution.</span>}
            </div>
          </div>
          {userFestivals.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <div style={styles.profilCardTitre}>Suggestions soumises ({userFestivals.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {userFestivals.map(f => (
                  <div key={f.id} style={styles.suggestionItem}>
                    <div style={{ fontWeight: 400, fontSize: 15 }}>{f.nom}</div>
                    <div style={{ fontSize: 12, opacity: 0.5, marginTop: 3 }}>{[f.ville, f.pays].filter(Boolean).join(", ")}{f.site && <> — <a href={f.site} target="_blank" rel="noreferrer" style={{ color: "#8B9EC4" }}>{f.site}</a></>}</div>
                    {f.notes && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6, fontStyle: "italic" }}>{f.notes}</div>}
                    <div style={{ fontSize: 11, opacity: 0.3, marginTop: 6 }}>Ajouté le {f.dateAjout} — en attente de validation ARPi</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ── Inject fonts ──────────────────────────────────────────────────────────────
if (typeof document !== "undefined") {
  const _s = document.createElement("style");
  _s.textContent = [
    "@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');",
    "html, body { margin: 0; padding: 0; background: #1C2B3A; box-sizing: border-box; }",
    "*, *::before, *::after { box-sizing: border-box; }",
  ].join("\n");
  document.head.appendChild(_s);
}

const C = {
  bg: "#1C2B3A", bg2: "#162232", bg3: "#243647",
  border: "#2E3F50", border2: "#3A5068",
  text: "#FFFFFF", muted: "rgba(255,255,255,0.55)", faint: "rgba(255,255,255,0.22)",
  orange: "#E8920A", orangeD: "#C07808", orangeBg: "rgba(232,146,10,0.10)",
};

const styles = {
  root: { fontFamily: "'Barlow', sans-serif", background: C.bg, color: C.text, minHeight: "100vh", display: "flex", flexDirection: "column", margin: 0, padding: 0 },
  header: { borderBottom: `1px solid ${C.border}`, background: C.bg2, position: "sticky", top: 0, zIndex: 100 },
  headerInner: { maxWidth: 1200, margin: "0 auto", padding: "12px 20px", minHeight: 68, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 },
  logoSub: { fontSize: 11, letterSpacing: "0.22em", color: C.muted, textTransform: "uppercase", marginTop: 2, fontFamily: "'Barlow Condensed', sans-serif" },
  nav: { display: "flex", gap: 4, flexWrap: "wrap" },
  navBtn: { background: "transparent", border: `1px solid ${C.border}`, color: C.text, padding: "7px 12px", borderRadius: 0, cursor: "pointer", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, transition: "all 0.15s", whiteSpace: "nowrap" },
  navBtnActive: { background: C.orange, borderColor: C.orange, color: "#000000" },
  main: { flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "clamp(20px, 5vw, 52px) clamp(16px, 4vw, 32px)", boxSizing: "border-box" },
  footer: { borderTop: `1px solid ${C.border}`, padding: "20px 32px", display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" },
  matcherWrap: { maxWidth: 860, margin: "0 auto" },
  matcherIntro: { marginBottom: 40, borderLeft: `4px solid ${C.orange}`, paddingLeft: 24 },
  h1: { fontSize: 42, fontWeight: 700, lineHeight: 1.1, marginBottom: 14, letterSpacing: "0.02em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" },
  h2: { fontSize: 30, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" },
  intro: { color: C.muted, lineHeight: 1.7, fontSize: 16, fontWeight: 300 },
  pitchBlock: { background: C.bg2, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.orange}`, borderRadius: 0, padding: 24, marginBottom: 12 },
  pitchHeader: { marginBottom: 12 },
  pitchArea: { width: "100%", background: C.bg, border: `1px solid ${C.border}`, color: C.text, padding: "14px 16px", borderRadius: 0, fontSize: 14, fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, resize: "vertical", boxSizing: "border-box", outline: "none" },
  pitchActions: { display: "flex", alignItems: "center", gap: 16, marginTop: 12, flexWrap: "wrap" },
  pitchBtn: { background: C.orangeBg, border: `1px solid ${C.orange}`, color: C.orange, padding: "10px 24px", borderRadius: 0, cursor: "pointer", fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, flexShrink: 0 },
  pitchResume: { fontSize: 13, color: C.muted, fontStyle: "italic", flex: 1 },
  pitchError: { fontSize: 12, color: "#FF6B6B", flex: 1 },
  divider: { display: "flex", alignItems: "center", gap: 16, margin: "28px 0" },
  dividerLabel: { fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: C.faint, textAlign: "center", padding: "0 16px", borderTop: `1px solid ${C.border}`, paddingTop: 16, width: "100%", fontFamily: "'Barlow Condensed', sans-serif" },
  matcherGrid: { display: "flex", flexDirection: "column", gap: 32 },
  matcherRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 },
  section: {},
  sectionTitle: { fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
  required: { color: C.orange },
  tagCloud: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: { background: "transparent", border: `1px solid ${C.border}`, color: C.text, padding: "6px 14px", borderRadius: 0, cursor: "pointer", fontSize: 12, transition: "all 0.1s", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 },
  tagActive: { background: C.orange, borderColor: C.orange, color: "#000000" },
  select: { background: C.bg2, border: `1px solid ${C.border}`, color: C.text, padding: "10px 14px", borderRadius: 0, width: "100%", fontSize: 13, fontFamily: "'Barlow', sans-serif", cursor: "pointer" },
  matchBtn: { background: C.orange, color: "#000000", border: "none", padding: "16px 48px", fontSize: 13, letterSpacing: "0.15em", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase", borderRadius: 0, cursor: "pointer", fontWeight: 700, transition: "all 0.15s" },
  resultsWrap: {},
  resultsHeader: { display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 32 },
  backBtn: { background: "transparent", border: `1px solid ${C.border}`, color: C.text, padding: "8px 16px", borderRadius: 0, cursor: "pointer", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", marginTop: 4 },
  resultsList: { display: "flex", flexDirection: "column", gap: 12 },
  resultCard: { background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 0, padding: "24px", display: "flex", gap: 20, cursor: "pointer", transition: "border-color 0.15s", borderLeft: "3px solid transparent" },
  resultRank: { fontSize: 32, fontWeight: 700, color: C.orange, opacity: 0.35, width: 44, flexShrink: 0, textAlign: "right", paddingTop: 2, fontFamily: "'Barlow Condensed', sans-serif" },
  resultTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  resultName: { fontSize: 18, fontWeight: 600, marginBottom: 4, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" },
  resultMeta: { fontSize: 12, color: C.muted, letterSpacing: "0.04em" },
  scoreCircle: { width: 44, height: 44, borderRadius: 0, background: C.bg2, border: `2px solid ${C.orange}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: C.orange, flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif" },
  matchBar: { height: 2, background: C.border, borderRadius: 0, marginBottom: 12 },
  matchBarFill: { height: "100%", background: `linear-gradient(90deg, ${C.orange}, #F5B942)`, borderRadius: 0, transition: "width 0.5s" },
  reasons: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 },
  reasonTag: { background: C.orangeBg, border: "1px solid rgba(232,146,10,0.3)", color: C.orange, padding: "3px 10px", borderRadius: 0, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500 },
  resultFooter: { display: "flex", alignItems: "center", gap: 16, fontSize: 12 },
  deadlineLabel: { color: C.muted },
  feesLabel: { color: C.faint, fontSize: 11 },
  ficheBtn: { marginLeft: "auto", background: "transparent", border: `1px solid ${C.orange}`, color: C.orange, padding: "6px 14px", borderRadius: 0, cursor: "pointer", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" },
  prestigeBadge: { padding: "3px 10px", borderRadius: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#000000", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" },
  catalogueWrap: {},
  catalogueHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 },
  catalogueFilters: { display: "flex", gap: 8 },
  catalogueGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 },
  catCard: { background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 0, borderTop: "3px solid transparent", padding: 20, cursor: "pointer", transition: "border-color 0.15s" },
  catCardTop: { display: "flex", gap: 8, marginBottom: 12 },
  catName: { fontSize: 15, marginBottom: 4, lineHeight: 1.3, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.02em" },
  catMeta: { fontSize: 12, color: C.muted, marginBottom: 2 },
  catEdition: { fontSize: 12, color: C.orange, marginBottom: 10, fontFamily: "'Barlow Condensed', sans-serif" },
  catFormats: { display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 },
  fmtTag: { background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, color: C.muted, padding: "2px 8px", borderRadius: 0, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" },
  catDeadline: { fontSize: 11, color: C.faint, letterSpacing: "0.04em" },
  regionTag: { background: "transparent", border: `1px solid ${C.border2}`, padding: "3px 8px", borderRadius: 0, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, fontFamily: "'Barlow Condensed', sans-serif" },
  ccaBadge: { background: "#1A4A2E", color: "#7FBF9A", border: "1px solid #2A6A42", padding: "3px 7px", borderRadius: 0, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" },
  ccaBadgeLg: { background: "#1A4A2E", color: "#7FBF9A", border: "1px solid #2A6A42", padding: "4px 10px", borderRadius: 0, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" },
  ccaFilterBtn: { background: "transparent", border: `1px solid ${C.border2}`, color: C.muted, padding: "8px 14px", borderRadius: 0, fontSize: 12, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase", transition: "all 0.15s" },
  ccaFilterBtnActive: { background: "#1A4A2E", color: "#7FBF9A", border: "1px solid #2A6A42" },
  checkLabel: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text, cursor: "pointer", userSelect: "none" },
  checkInput: { width: 15, height: 15, accentColor: C.orange, cursor: "pointer", flexShrink: 0 },
  ficheWrap: { maxWidth: 960, margin: "0 auto" },
  ficheHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, marginTop: 16, paddingBottom: 32, borderBottom: `1px solid ${C.border}`, flexWrap: "wrap", gap: 16 },
  fichePrestige: { display: "flex", gap: 8, marginBottom: 12 },
  ficheTitre: { fontSize: 34, fontWeight: 700, letterSpacing: "0.03em", marginBottom: 8, lineHeight: 1.15, textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" },
  ficheMeta: { color: C.muted, fontSize: 14 },
  siteBtn: { background: "transparent", border: `1px solid ${C.orange}`, color: C.orange, padding: "10px 20px", borderRadius: 0, textDecoration: "none", fontSize: 11, whiteSpace: "nowrap", flexShrink: 0, marginTop: 8, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" },
  ficheBody: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 },
  ficheCol: {},
  ficheBlockTitre: { fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint, marginBottom: 10, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  fmtTagLg: { background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, color: C.muted, padding: "5px 12px", borderRadius: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Barlow Condensed', sans-serif" },
  genreTag: { background: "rgba(232,146,10,0.08)", border: "1px solid rgba(232,146,10,0.3)", color: C.orange, padding: "5px 12px", borderRadius: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Barlow Condensed', sans-serif" },
  themeTag: { background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border2}`, color: C.text, padding: "5px 12px", borderRadius: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Barlow Condensed', sans-serif" },
  ficheSide: {},
  ficheSideCard: { background: C.bg2, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.orange}`, borderRadius: 0, padding: 24, position: "sticky", top: 80 },
  ficheStat: { marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${C.border}` },
  ficheStatLabel: { fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint, marginBottom: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
  ficheStatValue: { fontSize: 14 },
  ficheSoumission: { paddingTop: 20, borderTop: `1px solid ${C.border}`, marginTop: 4 },
  soumissionPlateforme: { fontSize: 15, fontWeight: 700, marginBottom: 6, color: C.orange, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" },
  soumissionNote: { fontSize: 12, color: C.muted, lineHeight: 1.5, marginBottom: 12 },
  soumissionBtn: { display: "inline-block", background: "transparent", border: `1px solid ${C.orange}`, color: C.orange, padding: "8px 16px", borderRadius: 0, textDecoration: "none", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" },
  soumissionPill: { background: C.orangeBg, border: "1px solid rgba(232,146,10,0.35)", color: C.orange, padding: "3px 10px", borderRadius: 0, fontSize: 12, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
  outilsWrap: { maxWidth: 1000, margin: "0 auto" },
  outilsIntro: { marginBottom: 36, borderLeft: `4px solid ${C.orange}`, paddingLeft: 24 },
  outilsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginBottom: 32 },
  outilCard: { background: C.bg3, border: `1px solid ${C.border}`, borderTop: "3px solid transparent", borderRadius: 0, padding: "18px 20px", cursor: "pointer", transition: "border-color 0.15s, background 0.15s" },
  outilCardActive: { background: C.bg2, borderColor: C.border2 },
  outilCardTop: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  outilLogo: { width: 40, height: 40, borderRadius: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#000", letterSpacing: "0.05em", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif" },
  outilNom: { fontSize: 15, fontWeight: 600, marginBottom: 2, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" },
  outilType: { fontSize: 12, color: C.faint, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Barlow Condensed', sans-serif" },
  ethiqueBadge: { background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border2}`, color: C.muted, padding: "2px 8px", borderRadius: 0, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "'Barlow Condensed', sans-serif" },
  outilFormats: { display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 },
  outilTarif: { fontSize: 11, color: C.faint, lineHeight: 1.4 },
  outilDetail: { background: C.bg2, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.orange}`, borderRadius: 0, padding: 28, marginBottom: 28 },
  outilDetailHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${C.border}` },
  outilDetailGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 },
  outilsNote: { fontSize: 11, color: C.faint, lineHeight: 1.6, borderTop: `1px solid ${C.border}`, paddingTop: 20, fontStyle: "italic" },
  profilWrap: { maxWidth: 900, margin: "0 auto" },
  profilHeader: { marginBottom: 32, borderLeft: `4px solid ${C.orange}`, paddingLeft: 24 },
  profilTabs: { display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 36 },
  profilTab: { background: "transparent", border: "none", borderBottom: "2px solid transparent", color: C.text, padding: "12px 24px", cursor: "pointer", fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, opacity: 0.45, marginBottom: -1, display: "flex", alignItems: "center", gap: 8 },
  profilTabActive: { opacity: 1, borderBottom: `2px solid ${C.orange}`, color: C.orange },
  profilBadge: { background: C.orange, color: "#000000", borderRadius: 0, padding: "1px 7px", fontSize: 12, fontWeight: 700 },
  profilContent: {},
  profilGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 },
  profilCard: { background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 0, padding: 24 },
  profilCardTitre: { fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint, marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
  radioRow: { display: "flex", alignItems: "center", cursor: "pointer", fontSize: 14, padding: "4px 0" },
  proposeIntro: { marginBottom: 28 },
  proposeForm: { display: "flex", flexDirection: "column", gap: 16 },
  proposeRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  proposeField: { display: "flex", flexDirection: "column", gap: 6, flex: 1 },
  proposeLabel: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.faint, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
  proposeInput: { background: C.bg2, border: `1px solid ${C.border}`, color: C.text, padding: "10px 14px", borderRadius: 0, fontSize: 13, fontFamily: "'Barlow', sans-serif", outline: "none" },
  suggestionItem: { background: C.bg3, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.orange}`, borderRadius: 0, padding: "16px 20px" },
};
