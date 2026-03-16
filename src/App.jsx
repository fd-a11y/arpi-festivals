<style>
  :root {
    --bg: #1B252F;
    --accent: #e8820c;
    --text: #f0f0f0;
    --text-muted: #8a9ab5;
    --border: rgba(232, 130, 12, 0.2);
  }

  .arpi-festivals-wrapper {
    position: relative;
    width: 100%;
    padding: 32px 40px 48px;
    background: var(--bg);
  }

  .arpi-iframe-container {
    position: relative;
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    background: var(--bg);
  }

  .arpi-iframe-loader {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--bg);
    z-index: 2;
    transition: opacity 0.4s;
  }

  .arpi-iframe-loader.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .arpi-loader-bar {
    width: 120px;
    height: 2px;
    background: rgba(232, 130, 12, 0.15);
    border-radius: 2px;
    overflow: hidden;
  }

  .arpi-loader-bar::after {
    content: '';
    display: block;
    height: 100%;
    width: 40%;
    background: var(--accent);
    border-radius: 2px;
    animation: arpi-slide 1.2s ease-in-out infinite;
  }

  @keyframes arpi-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }

  .arpi-loader-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  #arpi-festivals-frame {
    display: block;
    width: 100%;
    height: 100vh;
    min-height: 700px;
    border: none;
    background: transparent;
  }

  @media (max-width: 768px) {
    .arpi-section-header,
    .arpi-festivals-wrapper {
      padding-left: 20px;
      padding-right: 20px;
    }

    #arpi-festivals-frame {
      height: 100vh;
      min-height: 600px;
    }
  }
</style>

<div class="arpi-festivals-wrapper">
  <div class="arpi-iframe-container">

    <div class="arpi-iframe-loader" id="arpi-loader">
      <div class="arpi-loader-bar"></div>
      <span class="arpi-loader-text">Chargement</span>
    </div>

    <iframe
      id="arpi-festivals-frame"
      src="https://arpi-festivals.netlify.app"
      title="ARPi Festivals - Identification de festivals"
      loading="lazy"
      allow="fullscreen"
    ></iframe>

  </div>
</div>

<script>
  (function () {
    var frame = document.getElementById('arpi-festivals-frame');
    var loader = document.getElementById('arpi-loader');

    frame.addEventListener('load', function () {
      loader.classList.add('hidden');
    });

    window.addEventListener('message', function (e) {
      if (e.origin !== 'https://arpi-festivals.netlify.app') return;
      if (e.data && typeof e.data.height === 'number') {
        frame.style.height = e.data.height + 'px';
      }
    });
  })();
</script>  },
  {
    id: 5,
    nom: "Millenium — Festival International du Film Documentaire",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["long-métrage documentaire", "court-métrage documentaire"],
    genres: ["documentaire"],
    themes: ["droits humains", "environnement", "politique", "société"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Avril", frais: "Gratuit",
    prestige: "A", site: "https://millenniumfestival.be",
    description: "Documentaires engagés sur les droits humains et les enjeux globaux.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Inscription via DocFilmDepot — gratuit" },
  },
  {
    id: 6,
    nom: "Les René du cinéma",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire", "animation"],
    genres: ["tous genres"],
    themes: ["cinéma belge"],
    langues: ["français", "néerlandais"],
    deadline: "À confirmer", edition: "Février", frais: "Sur invitation",
    prestige: "A+", site: "https://lesmagritteducinema.com",
    description: "Les René du cinéma — les récompenses du cinéma belge, toutes catégories, toutes productions belges.",
    accréditations: [], profils: ["réalisateur", "producteur", "auteur"],
    cca: false,
    soumission: { plateforme: "Sur invitation", url: "https://lesmagritteducinema.com", note: "Sélection sur dossier — productions belges éligibles uniquement" },
  },
  {
    id: 15,
    nom: "Liège International Short Film Festival",
    pays: "Belgique", ville: "Liège", region: "belgique",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Décembre", frais: "Gratuit",
    prestige: "B", site: "#",
    description: "Vitrine du court-métrage en région wallonne, avec accent sur les productions belges.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot — gratuit" },
  },
  {
    id: 56,
    nom: "BSFF — Brussels Short Film Festival",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mai", frais: "À confirmer",
    prestige: "A", site: "https://bsff.be",
    description: "Festival international de court-métrage de référence à Bruxelles, tremplin pour les jeunes réalisateurs.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 57,
    nom: "Festival Elles Tournent",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["court-métrage fiction", "long-métrage fiction", "court-métrage documentaire", "long-métrage documentaire"],
    genres: ["drame", "documentaire", "social"],
    themes: ["identité", "société", "droits humains", "famille"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "B", site: "#",
    description: "Festival mettant en avant les réalisatrices, espace de visibilité pour les cinéastes femmes.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "#", note: "Formulaire sur le site officiel" },
  },
  {
    id: 58,
    nom: "Massimadi — Festival Afro-LGBTQ+ de Bruxelles",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["court-métrage fiction", "long-métrage fiction", "court-métrage documentaire"],
    genres: ["documentaire", "drame", "social"],
    themes: ["identité", "diaspora", "droits humains", "société"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "À confirmer",
    prestige: "B", site: "https://massimadi.be",
    description: "Seul festival Afro-LGBTQ+ en Belgique, dédié aux films afrophones traitant des questions de genre et de sexualité.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "https://massimadi.be", note: "Formulaire sur le site officiel" },
  },
  {
    id: 59,
    nom: "Ramdam Festival",
    pays: "Belgique", ville: "Tournai", region: "belgique",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["expérimental", "documentaire", "essai", "social"],
    themes: ["société", "art", "politique", "identité"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Printemps", frais: "À confirmer",
    prestige: "B", site: "#",
    description: "Festival de cinéma alternatif en Wallonie, regard singulier sur les formes cinématographiques engagées.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "#", note: "Formulaire sur le site officiel" },
  },
  {
    id: 60,
    nom: "Festival du Film Fantastique de Bruxelles",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["long-métrage fiction", "court-métrage fiction"],
    genres: ["thriller", "expérimental"],
    themes: ["fantaisie", "société"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Avril", frais: "À confirmer",
    prestige: "B", site: "https://bifff.net",
    description: "Festival international du film fantastique, d'horreur et de SF de Bruxelles.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "https://bifff.net", note: "Formulaire sur le site officiel" },
  },
  {
    id: 61,
    nom: "Festival International du Film d'Animation de Bruxelles",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["court-métrage animation", "long-métrage animation"],
    genres: ["animation"], themes: ["art", "jeunesse"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "À confirmer", frais: "À confirmer",
    prestige: "B", site: "#",
    description: "Festival dédié au film d'animation à Bruxelles, vitrine des productions belges et internationales.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "#", note: "Formulaire sur le site officiel" },
  },
  {
    id: 62,
    nom: "Court mais thrash / Queer mais thrash",
    pays: "Belgique", ville: "Bruxelles", region: "belgique",
    formats: ["court-métrage fiction", "court-métrage documentaire"],
    genres: ["expérimental", "social"],
    themes: ["identité", "société", "art"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "À confirmer", frais: "Gratuit",
    prestige: "B", site: "#",
    description: "Festivals alternatifs bruxellois défendant des œuvres courtes radicales et queer.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "#", note: "Formulaire sur le site officiel" },
  },
  {
    id: 63,
    nom: "Festival Les Enfants Terribles de Huy",
    pays: "Belgique", ville: "Huy", region: "belgique",
    formats: ["court-métrage fiction", "court-métrage documentaire"],
    genres: ["tous genres court-métrage"], themes: ["jeunesse", "société"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "B", site: "#",
    description: "Festival valorisant les courts-métrages de jeunes réalisateurs belges et étrangers en formation.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "#", note: "Formulaire sur le site officiel" },
  },
  // ── FRANCOPHONIE ────────────────────────────────────────────────────────────
  {
    id: 7,
    nom: "Festival de Cannes — Sélection officielle",
    pays: "France", ville: "Cannes", region: "francophonie",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "série"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mai", frais: "Accréditation professionnelle",
    prestige: "A+", site: "https://festival-cannes.com",
    description: "Le rendez-vous mondial du cinéma. Sélection officielle, Un Certain Regard, Quinzaine des Cinéastes, Semaine de la Critique.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Cinando + soumission directe", url: "https://cinando.com", note: "Soumission officielle via le site Cannes ; Cinando pour le Marché du Film" },
  },
  {
    id: 8,
    nom: "Visions du Réel — Festival International de Cinéma",
    pays: "Suisse", ville: "Nyon", region: "francophonie",
    formats: ["long-métrage documentaire", "court-métrage documentaire", "essai"],
    genres: ["documentaire", "expérimental", "essai"],
    themes: ["société", "politique", "art", "mémoire", "environnement"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Avril", frais: "Gratuit",
    prestige: "A", site: "https://visionsdureel.ch",
    description: "Festival de référence pour le documentaire de création et le cinéma du réel.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Dépôt via DocFilmDepot — gratuit" },
  },
  {
    id: 9,
    nom: "RIDM — Rencontres Internationales du Documentaire de Montréal",
    pays: "Canada", ville: "Montréal", region: "francophonie",
    formats: ["long-métrage documentaire", "court-métrage documentaire"],
    genres: ["documentaire"],
    themes: ["société", "identité", "diaspora", "environnement", "droits humains"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "Gratuit",
    prestige: "A", site: "https://ridm.ca",
    description: "Le principal festival de documentaire au Québec, ouvert sur la francophonie mondiale.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Inscription via DocFilmDepot" },
  },
  {
    id: 10,
    nom: "FIDMarseille — Festival International de Cinéma",
    pays: "France", ville: "Marseille", region: "francophonie",
    formats: ["long-métrage documentaire", "court-métrage documentaire", "essai", "long-métrage fiction"],
    genres: ["documentaire", "expérimental", "essai", "hybride"],
    themes: ["art", "société", "mémoire", "identité"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Juillet", frais: "Gratuit",
    prestige: "A", site: "https://fidmarseille.org",
    description: "Festival du cinéma du réel et des formes hybrides, ancré dans la création contemporaine.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://fidmarseille.org", note: "Formulaire sur le site officiel — gratuit" },
  },
  {
    id: 11,
    nom: "Cinéma du Réel — Paris",
    pays: "France", ville: "Paris", region: "francophonie",
    formats: ["long-métrage documentaire", "court-métrage documentaire"],
    genres: ["documentaire"],
    themes: ["société", "art", "politique", "mémoire"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mars", frais: "Gratuit",
    prestige: "A", site: "https://cinemadureel.org",
    description: "Festival parisien de référence pour le documentaire, coproduit par le Centre Pompidou.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Dépôt via DocFilmDepot — gratuit" },
  },
  {
    id: 12,
    nom: "Entrevues Belfort",
    pays: "France", ville: "Belfort", region: "francophonie",
    formats: ["long-métrage fiction", "long-métrage documentaire"],
    genres: ["drame", "documentaire", "indépendant"],
    themes: ["société", "identité", "politique"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "Gratuit",
    prestige: "B", site: "https://festival-entrevues.com",
    description: "Festival dédié au cinéma indépendant et aux premiers films, regard engagé.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "https://festival-entrevues.com", note: "Formulaire sur le site — gratuit" },
  },
  {
    id: 13,
    nom: "Festival des Films du Monde — Montréal",
    pays: "Canada", ville: "Montréal", region: "francophonie",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Août", frais: "Gratuit",
    prestige: "A", site: "https://ffm-montreal.org",
    description: "L'un des plus importants festivals d'Amérique du Nord, accrédité FIAPF.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "https://ffm-montreal.org", note: "Formulaire officiel en ligne" },
  },
  {
    id: 14,
    nom: "Internationale Kurzfilmtage Winterthur",
    pays: "Suisse", ville: "Winterthur", region: "francophonie",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "15 CHF",
    prestige: "A", site: "https://kurzfilmtage.ch",
    description: "Festival de référence pour le court-métrage international.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot — tarifs équitables, interface en français" },
  },
  {
    id: 40,
    nom: "Festival du Court Métrage de Clermont-Ferrand",
    pays: "France", ville: "Clermont-Ferrand", region: "francophonie",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Février", frais: "À confirmer",
    prestige: "A+", site: "https://clermont-filmfest.org",
    description: "Le plus grand festival de court-métrage au monde. Compétitions nationale, internationale et Labo. Marché du Film Court majeur.",
    accréditations: [], profils: ["réalisateur", "auteur", "producteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 41,
    nom: "Festival International du Film d'Animation d'Annecy",
    pays: "France", ville: "Annecy", region: "francophonie",
    formats: ["court-métrage animation", "long-métrage animation", "série animation"],
    genres: ["animation"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Juin", frais: "À confirmer",
    prestige: "A+", site: "https://www.annecyfestival.com",
    description: "Le festival d'animation le plus important au monde. Cristal d'Annecy, marché Mifa.",
    accréditations: ["ASIFA"], profils: ["réalisateur", "producteur", "auteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.annecyfestival.com", note: "Formulaire officiel via le site" },
  },
  {
    id: 42,
    nom: "Fantasia International Film Festival",
    pays: "Canada", ville: "Montréal", region: "francophonie",
    formats: ["long-métrage fiction", "court-métrage fiction"],
    genres: ["thriller", "expérimental", "hybride"],
    themes: ["fantaisie", "identité", "société"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Juillet-Août", frais: "À confirmer",
    prestige: "A", site: "https://www.fantasiafestival.com",
    description: "Le plus grand festival de genre (fantastique, horreur, SF) en Amérique du Nord, implanté à Montréal.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.fantasiafestival.com", note: "Formulaire officiel" },
  },
  {
    id: 43,
    nom: "REGARD — Festival International du Court Métrage au Saguenay",
    pays: "Canada", ville: "Saguenay", region: "francophonie",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Mars", frais: "À confirmer",
    prestige: "A", site: "https://www.regardsaguenay.ca",
    description: "Principal festival de court-métrage au Québec, vitrine du court-métrage francophone international.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 44,
    nom: "Séries Mania",
    pays: "France", ville: "Lille", region: "francophonie",
    formats: ["série"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mars", frais: "À confirmer",
    prestige: "A", site: "https://seriesmania.com",
    description: "Le plus grand festival européen dédié aux séries. Forum de coproduction et marché international.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://seriesmania.com", note: "Formulaire officiel" },
  },
  {
    id: 45,
    nom: "Festival de la Fiction — La Rochelle",
    pays: "France", ville: "La Rochelle", region: "francophonie",
    formats: ["série", "long-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Septembre", frais: "À confirmer",
    prestige: "A", site: "https://www.festival-fiction.fr",
    description: "Festival de référence pour la fiction télévisée francophone, avec prix Colombe d'Or.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.festival-fiction.fr", note: "Formulaire officiel" },
  },
  {
    id: 46,
    nom: "Les Arcs Film Festival",
    pays: "France", ville: "Les Arcs", region: "francophonie",
    formats: ["long-métrage fiction", "long-métrage documentaire"],
    genres: ["drame", "documentaire", "indépendant"],
    themes: ["société", "identité"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Décembre", frais: "À confirmer",
    prestige: "A", site: "https://www.lesarcsfilmfestival.com",
    description: "Festival européen de cinéma en altitude, centré sur la coproduction et la distribution européenne.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.lesarcsfilmfestival.com", note: "Formulaire officiel" },
  },
  {
    id: 47,
    nom: "FIPADOC — Festival International du Documentaire de Biarritz",
    pays: "France", ville: "Biarritz", region: "francophonie",
    formats: ["long-métrage documentaire", "court-métrage documentaire", "série documentaire"],
    genres: ["documentaire"],
    themes: ["société", "art", "droits humains"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Janvier", frais: "À confirmer",
    prestige: "A", site: "https://www.fipadoc.com",
    description: "Festival international du documentaire de Biarritz, centré sur les coproductions francophones et européennes.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Dépôt via DocFilmDepot" },
  },
  {
    id: 48,
    nom: "Festival Suisse Black Movie — Genève",
    pays: "Suisse", ville: "Genève", region: "francophonie",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["indépendant", "drame", "documentaire", "social"],
    themes: ["société", "identité", "politique", "diaspora"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Janvier", frais: "À confirmer",
    prestige: "A", site: "https://blackmovie.ch",
    description: "Festival genevois dédié au cinéma indépendant international, regards singuliers sur le monde.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: false,
    soumission: { plateforme: "Soumission directe", url: "https://blackmovie.ch", note: "Formulaire officiel" },
  },
  // ── INTERNATIONAL ────────────────────────────────────────────────────────────
  {
    id: 16,
    nom: "Berlinale — Festival International du Film de Berlin",
    pays: "Allemagne", ville: "Berlin", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Février", frais: "À confirmer",
    prestige: "A+", site: "https://www.berlinale.de/en/home.html",
    description: "L'un des festivals les plus importants au monde. Compétition principale, Panorama, Forum, Generation, Berlinale Shorts.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur", "auteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.berlinale.de", note: "Formulaire officiel — compétition sur invitation, autres sections sur dossier" },
  },
  {
    id: 17,
    nom: "Mostra de Venise — Festival International du Film",
    pays: "Italie", ville: "Venise", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Septembre", frais: "À confirmer",
    prestige: "A+", site: "https://www.labiennale.org/en/cinema",
    description: "Le plus ancien festival de cinéma au monde. Lion d'Or, Orizzonti, Giornate degli Autori.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.labiennale.org/en/cinema", note: "Sélection officielle sur invitation ; Giornate degli Autori sur dossier" },
  },
  {
    id: 18,
    nom: "TIFF — Toronto International Film Festival",
    pays: "Canada", ville: "Toronto", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Septembre", frais: "À confirmer",
    prestige: "A+", site: "https://tiff.net",
    description: "L'un des festivals les plus influents d'Amérique du Nord, marché majeur et tremplin vers les Oscars.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://tiff.net", note: "Formulaire officiel en ligne" },
  },
  {
    id: 19,
    nom: "Sundance Film Festival",
    pays: "États-Unis", ville: "Park City", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire"],
    genres: ["indépendant", "drame", "documentaire"], themes: ["société", "identité", "droits humains"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Janvier", frais: "À confirmer",
    prestige: "A+", site: "https://www.sundance.org",
    description: "Festival de référence pour le cinéma indépendant américain et international.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.sundance.org", note: "Formulaire officiel — soumission très compétitive" },
  },
  {
    id: 20,
    nom: "IFFR — Festival International du Film de Rotterdam",
    pays: "Pays-Bas", ville: "Rotterdam", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire"],
    genres: ["expérimental", "indépendant", "hybride", "drame", "documentaire"],
    themes: ["art", "société", "politique", "identité"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Janvier-Février", frais: "À confirmer",
    prestige: "A+", site: "https://iffr.com",
    description: "Festival européen de référence pour le cinéma audacieux et indépendant. Tigre d'Or, Hubert Bals Fund.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://iffr.com", note: "Formulaire officiel en ligne" },
  },
  {
    id: 21,
    nom: "Locarno Film Festival",
    pays: "Suisse", ville: "Locarno", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage animation"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Août", frais: "À confirmer",
    prestige: "A+", site: "https://www.locarnofestival.ch",
    description: "L'un des plus anciens festivals au monde. Piazza Grande, Compétition internationale, Cineasti del Presente.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.locarnofestival.ch", note: "Formulaire officiel" },
  },
  {
    id: 22,
    nom: "Busan International Film Festival",
    pays: "Corée du Sud", ville: "Busan", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "A+", site: "https://www.biff.kr",
    description: "Le plus grand festival d'Asie, accrédité FIAPF. Porte d'entrée vers les marchés asiatiques.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.biff.kr", note: "Formulaire officiel" },
  },
  {
    id: 23,
    nom: "BFI London Film Festival",
    pays: "Royaume-Uni", ville: "Londres", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "A", site: "https://whatson.bfi.org.uk/lff/",
    description: "Festival londonien de prestige, vitrine du meilleur cinéma mondial avec une section court-métrage reconnue.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://whatson.bfi.org.uk/lff/", note: "Formulaire officiel en ligne" },
  },
  {
    id: 24,
    nom: "San Sebastian International Film Festival",
    pays: "Espagne", ville: "Saint-Sébastien", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire"],
    genres: ["drame", "documentaire", "indépendant"], themes: ["société", "identité", "politique"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Septembre", frais: "À confirmer",
    prestige: "A", site: "https://www.sansebastianfestival.com",
    description: "Festival accrédité FIAPF, l'un des plus importants d'Europe. Concha d'Or.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.sansebastianfestival.com", note: "Formulaire officiel" },
  },
  {
    id: 25,
    nom: "Tallinn Black Nights Film Festival",
    pays: "Estonie", ville: "Tallinn", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "À confirmer",
    prestige: "A", site: "https://poff.ee",
    description: "Plus grand festival accrédité FIAPF en Europe du Nord, fort réseau de coproduction.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Courts via Shortfilmdepot ; longs via soumission directe" },
  },
  {
    id: 26,
    nom: "Warsaw Film Festival",
    pays: "Pologne", ville: "Varsovie", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "A", site: "https://wff.pl",
    description: "Festival accrédité FIAPF, carrefour entre cinémas européen et international.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://wff.pl", note: "Formulaire officiel" },
  },
  {
    id: 27,
    nom: "Göteborg Film Festival",
    pays: "Suède", ville: "Göteborg", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire"],
    genres: ["drame", "documentaire", "indépendant", "social"],
    themes: ["société", "identité", "environnement", "droits humains"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Janvier-Février", frais: "À confirmer",
    prestige: "A", site: "https://www.giff.se",
    description: "Le plus grand festival de cinéma des pays nordiques, fort réseau de coproduction scandinave.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.giff.se", note: "Formulaire officiel" },
  },
  {
    id: 28,
    nom: "SXSW Film Festival",
    pays: "États-Unis", ville: "Austin", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire"],
    genres: ["indépendant", "documentaire", "hybride"], themes: ["société", "identité"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mars", frais: "À confirmer",
    prestige: "A", site: "https://www.sxsw.com/film/",
    description: "Festival culturel majeur conjuguant cinéma, musique et technologie. Tremplin pour les projets innovants.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.sxsw.com/film/", note: "Formulaire officiel" },
  },
  {
    id: 29,
    nom: "Tribeca Film Festival",
    pays: "États-Unis", ville: "New York", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire"],
    genres: ["indépendant", "documentaire", "drame", "social"],
    themes: ["société", "identité", "droits humains"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Juin", frais: "À confirmer",
    prestige: "A", site: "https://www.tribecafilm.com",
    description: "Festival new-yorkais de référence pour le cinéma indépendant américain et international.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.tribecafilm.com", note: "Formulaire officiel" },
  },
  {
    id: 30,
    nom: "KVIFF — Karlovy Vary International Film Festival",
    pays: "Tchéquie", ville: "Karlovy Vary", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["drame", "documentaire", "social"], themes: ["société", "identité", "politique"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Juillet", frais: "À confirmer",
    prestige: "A", site: "https://www.kviff.com",
    description: "L'un des festivals les plus importants d'Europe centrale, accrédité FIAPF.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.kviff.com", note: "Formulaire officiel" },
  },
  {
    id: 31,
    nom: "AFI Fest",
    pays: "États-Unis", ville: "Los Angeles", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "À confirmer",
    prestige: "A", site: "https://fest.afi.com/",
    description: "Festival de l'American Film Institute à Los Angeles, vitrine des films de la saison des récompenses.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://fest.afi.com/", note: "Formulaire officiel" },
  },
  {
    id: 32,
    nom: "Palm Springs International Film Festival",
    pays: "États-Unis", ville: "Palm Springs", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Janvier", frais: "À confirmer",
    prestige: "A", site: "https://www.psfilmfest.org",
    description: "Festival américain majeur sur la route des Oscars, reconnu pour sa section films étrangers.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.psfilmfest.org", note: "Formulaire officiel" },
  },
  {
    id: 33,
    nom: "IDFA — International Documentary Film Festival Amsterdam",
    pays: "Pays-Bas", ville: "Amsterdam", region: "international",
    formats: ["long-métrage documentaire", "court-métrage documentaire", "essai"],
    genres: ["documentaire", "essai", "hybride"],
    themes: ["société", "politique", "droits humains", "environnement", "identité"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "À confirmer",
    prestige: "A+", site: "https://www.idfa.nl",
    description: "Le plus grand festival de documentaire au monde. Compétition principale, DocLab, Forum de coproduction.",
    accréditations: [], profils: ["réalisateur", "producteur", "auteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Inscription via DocFilmDepot" },
  },
  {
    id: 34,
    nom: "CPH:DOX — Copenhagen International Documentary Film Festival",
    pays: "Danemark", ville: "Copenhague", region: "international",
    formats: ["long-métrage documentaire", "court-métrage documentaire"],
    genres: ["documentaire", "expérimental"],
    themes: ["société", "environnement", "politique", "art"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mars", frais: "À confirmer",
    prestige: "A", site: "https://cphdox.dk",
    description: "L'un des festivals de documentaire les plus dynamiques d'Europe, avec un fort ancrage dans les formes innovantes.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Dépôt via DocFilmDepot" },
  },
  {
    id: 35,
    nom: "Hot Docs",
    pays: "Canada", ville: "Toronto", region: "international",
    formats: ["long-métrage documentaire", "court-métrage documentaire"],
    genres: ["documentaire"],
    themes: ["société", "droits humains", "environnement", "identité"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Avril-Mai", frais: "À confirmer",
    prestige: "A", site: "https://hotdocs.ca",
    description: "Plus grand festival de documentaire en Amérique du Nord, avec un important forum de coproduction.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Dépôt via DocFilmDepot" },
  },
  {
    id: 36,
    nom: "Sheffield DocFest",
    pays: "Royaume-Uni", ville: "Sheffield", region: "international",
    formats: ["long-métrage documentaire", "court-métrage documentaire"],
    genres: ["documentaire"],
    themes: ["société", "droits humains", "politique", "environnement"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Juin", frais: "À confirmer",
    prestige: "A", site: "https://www.sheffdocfest.com",
    description: "L'un des festivals de documentaire les plus influents du Royaume-Uni, marché et pitch de coproduction.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Dépôt via DocFilmDepot" },
  },
  {
    id: 37,
    nom: "DOK Leipzig",
    pays: "Allemagne", ville: "Leipzig", region: "international",
    formats: ["long-métrage documentaire", "court-métrage documentaire", "essai", "animation"],
    genres: ["documentaire", "animation", "expérimental"],
    themes: ["société", "politique", "art", "mémoire"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "A", site: "https://www.dok-leipzig.de",
    description: "Parmi les plus anciens festivals de documentaire et d'animation au monde, héritage est-européen.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "DocFilmDepot", url: "https://www.docfilmdepot.com", note: "Dépôt via DocFilmDepot" },
  },
  {
    id: 38,
    nom: "Go Short — International Short Film Festival Nijmegen",
    pays: "Pays-Bas", ville: "Nimègue", region: "international",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Avril", frais: "À confirmer",
    prestige: "A", site: "https://goshort.nl",
    description: "Festival européen de référence pour le court-métrage, ancré dans la culture du cinéma indépendant.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 39,
    nom: "Tampere Film Festival",
    pays: "Finlande", ville: "Tampere", region: "international",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mars", frais: "À confirmer",
    prestige: "A", site: "https://tamperefilmfestival.fi",
    description: "Festival de court-métrage accrédité FIAPF, l'un des plus anciens dans sa catégorie.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 49,
    nom: "Uppsala Short Film Festival",
    pays: "Suède", ville: "Uppsala", region: "international",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "A", site: "https://www.shortfilmfestival.com",
    description: "L'un des principaux festivals scandinaves de court-métrage, reconnu par la FIAPF.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 50,
    nom: "Interfilm Berlin — International Short Film Festival",
    pays: "Allemagne", ville: "Berlin", region: "international",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    genres: ["tous genres court-métrage"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Novembre", frais: "À confirmer",
    prestige: "A", site: "https://www.interfilm.de",
    description: "Festival international de court-métrage de Berlin, avec compétitions thématiques et programmation éclectique.",
    accréditations: [], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 51,
    nom: "Animafest Zagreb — World Festival of Animated Film",
    pays: "Croatie", ville: "Zagreb", region: "international",
    formats: ["court-métrage animation", "long-métrage animation"],
    genres: ["animation"],
    themes: ["art", "jeunesse", "société"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Juin", frais: "À confirmer",
    prestige: "A", site: "http://www.animafest.hr/en",
    description: "L'un des plus importants festivals d'animation au monde, fondé en 1972, tradition du film d'auteur.",
    accréditations: ["ASIFA"], profils: ["réalisateur", "auteur"],
    cca: true,
    soumission: { plateforme: "Shortfilmdepot", url: "https://shortfilmdepot.com/fr", note: "Inscription via Shortfilmdepot" },
  },
  {
    id: 52,
    nom: "Stuttgart International Festival of Animated Film",
    pays: "Allemagne", ville: "Stuttgart", region: "international",
    formats: ["court-métrage animation", "long-métrage animation", "série animation"],
    genres: ["animation"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Mai", frais: "À confirmer",
    prestige: "A", site: "https://www.itfs.de",
    description: "Festival de référence européen pour l'animation, toutes formes et tous publics confondus.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.itfs.de", note: "Formulaire officiel" },
  },
  {
    id: 53,
    nom: "Sitges — Festival Internacional de Cinema Fantàstic de Catalunya",
    pays: "Espagne", ville: "Sitges", region: "international",
    formats: ["long-métrage fiction", "court-métrage fiction"],
    genres: ["thriller", "expérimental"],
    themes: ["fantaisie", "société"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Octobre", frais: "À confirmer",
    prestige: "A", site: "https://sitgesfilmfestival.com",
    description: "Festival de référence mondial pour le cinéma fantastique et de genre, reconnu par la FIAPF.",
    accréditations: ["FIAPF"], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://sitgesfilmfestival.com", note: "Formulaire officiel" },
  },
  {
    id: 54,
    nom: "Canneséries — International Series Festival",
    pays: "France", ville: "Cannes", region: "international",
    formats: ["série"],
    genres: ["tous genres"], themes: ["tous thèmes"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Avril", frais: "À confirmer",
    prestige: "A", site: "https://www.cannesseries.com",
    description: "Festival international de séries de Cannes, marché et compétition pour les productions audiovisuelles en série.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.cannesseries.com", note: "Formulaire officiel" },
  },
  {
    id: 55,
    nom: "FESPACO — Festival Panafricain du Cinéma et de la Télévision de Ouagadougou",
    pays: "Burkina Faso", ville: "Ouagadougou", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire"],
    genres: ["tous genres"], themes: ["identité", "diaspora", "société", "droits humains", "francophonie"],
    langues: ["français", "toutes langues"],
    deadline: "À confirmer", edition: "Février (biennale)", frais: "Gratuit",
    prestige: "A", site: "https://www.fespaco.bf",
    description: "Le plus grand festival de cinéma africain, biennale consacrée aux films africains et de la diaspora. Étalon de Yennenga.",
    accréditations: [], profils: ["réalisateur", "producteur", "auteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.fespaco.bf", note: "Formulaire officiel — films africains ou de la diaspora" },
  },
  {
    id: 64,
    nom: "BAFICI — Buenos Aires Festival Internacional de Cine Independiente",
    pays: "Argentine", ville: "Buenos Aires", region: "international",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire"],
    genres: ["indépendant", "expérimental", "documentaire", "hybride"],
    themes: ["société", "identité", "art"],
    langues: ["toutes langues"],
    deadline: "À confirmer", edition: "Avril", frais: "À confirmer",
    prestige: "A", site: "https://www.buenosaires.gob.ar/cultura/festivales-de-buenos/bafici",
    description: "Le plus grand festival de cinéma indépendant d'Amérique latine.",
    accréditations: [], profils: ["réalisateur", "producteur"],
    cca: true,
    soumission: { plateforme: "Soumission directe", url: "https://www.buenosaires.gob.ar", note: "Formulaire officiel" },
  },
];

const ALL_FORMATS = [...new Set(FESTIVALS.flatMap(f => f.formats))].sort();
const ALL_GENRES = [...new Set(FESTIVALS.flatMap(f => f.genres))].sort();
const ALL_THEMES = [...new Set(FESTIVALS.flatMap(f => f.themes))].sort();

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
  const [view, setView] = useState("matcher"); // matcher | catalogue | fiche
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
  const [userFestivals, setUserFestivals] = useState([]); // festivals proposés par les membres

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

    const scored = FESTIVALS.map(f => {
      let score = 0;
      let reasons = [];

      // Exclusion : festival 100% animation → invisible sans sélection animation
      const festivalIsPureAnimation =
        f.formats.length > 0 &&
        f.formats.every(fmt => ANIMATION_FORMATS.includes(fmt));
      if (festivalIsPureAnimation && !userWantsAnimation) {
        return { ...f, score: 0, reasons: [] };
      }

      // Exclusion : DocFilmDepot = documentaire → invisible sans sélection documentaire
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
        // "animation" ne score que si le festival le déclare explicitement
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
    return FESTIVALS.filter(f => {
      if (catalogueFilters.region && f.region !== catalogueFilters.region) return false;
      if (catalogueFilters.prestige && f.prestige !== catalogueFilters.prestige) return false;
      if (catalogueFilters.cca && !f.cca) return false;
      return true;
    });
  }, [catalogueFilters]);

  if (view === "fiche" && selectedFestival) {
    return (
      <div style={styles.root}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a href="https://arpi-org.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://arpi-org.com/wp-content/uploads/2024/07/LOGO-ARPI-2024-BLC.png"
                  alt="ARPi"
                  style={{ height: 44, width: "auto" }}
                />
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
                <button
                  key={n.key}
                  style={{ ...styles.navBtn }}
                  onClick={() => setView(n.key)}
                >
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
        </header>
        <main style={styles.main}>
          <FicheFestival festival={selectedFestival} onBack={() => setView(matchResults ? "results" : "catalogue")} />
        </main>
        <footer style={styles.footer}>
          <span>ARPi — Association des Auteur·rice·s/Réalisateur·trice·s-Producteur·trice·s Indépendant·e·s</span>
          <span style={{ opacity: 0.4 }}>v1.3 — Belgique · Francophonie · International</span>
        </footer>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB88AAAfQCAYAAABMnR4cAAEAAElEQVR4nOzdeZhlZXXv8d8ezj5TVfUMNDM0GEAmmUSZRCEExQHUBLhg1DgbI4IDajSKSMSg5HolwehVFK+EqCghkAQVRcUBhJBIHEEUQYGWoWs4w57e+0dlvb3P6eoGgerqqvp+noeH6pr6dNU5+93vWutdSwIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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1n632Wyq0+kMvL/altz2wGVZqixL3X777W7NmjUb7K2cc5qYmNDY2NjjGi2G34/9XuI41g9/+EPddNNN+tnPfqbvf//7uuuuu/SLX/wikNYnnGZKLiVJorIsfXGbjbQBsGULgkBjY2P+PrrK9lHWdSLLMq1atcrdf//9kuTHPNh13A75bI7ip+oezB6j/Z02wuKee+7RRz/6Uf3DP/yDpqamAivqsgKvOI4VRZGq73fOce0CAACYC+12299YztQyttlsKgxDXXLJJQPtiKotTastipxzrtvtPtHdjzCDfr8/8OeyLN3ExIRzzrksy5xzzv3Lv/yLkzTQIlgabIcVRZEajcbA+zhVAQCPXfUamiSJms3mBq34htuJbrXVVu6www5z1157rXPOuaIoBq7nZmpqyq1bt86VZbnBWjA1NTU7C84iZD9fMzU1NfDzXbdunf8dOefcfvvt56oJl+qaWn176dKlHB0BgM0gCALVajW/1w2CQFEUaenSpe5JT3qSe/GLX+ze8573uP/4j/9wzk239R2+9ps8z2fc/+KJ1+v1BtZXk2WZ/x0ccsghTpJPNEnrC8GNHQagoBCYH2YaQyhNv85rtdpAy/NGo6HddtvN/dmf/Zm7+eabB64VZVm6TqczcD2f6ZryRMvzfIPrV5ZlM/7dk5OT7swzz3SrV692do0ajsdVi7W4jgEAAGxm1c1mvV73QXy7KR0ZGdE//dM/uRtvvNHdf//9PoBfvQnN89xNTk76PzNvdfOyQP7U1NQGwZ5+v+/yPHcXXnihe8pTnuK23357J8nPNd/YyYk4jjdLWysAWKiSJNlkEVI1OLRq1Sr3nOc8x911113++m2FUOvWrfPve+ihh5xz69fgsiw3KKJybn0hGx6fLMtcv98fSJjP9LO1z7vlllvczTff7G6++WZ37rnnuna7LWn9bMbhIjUAwBOvWqwmDc6OTZJE73//+11RFH4tnWnvatf9TqfjnJveU1EcvnlYctziDt1u19//VH33u991t912mzv11FPdTL/r6jibIAg2mpQDsGVptVoDSfLhmNWuu+7qXvSiF7lf/vKXLssy1+l0/LXaktR2v57n+QbFrptDlmUuz3NXlqUry9LvFexxVeN2DzzwgHvpS1/qms2mRkdHJWlg/Jb9LNhDAPMXr14AmOeiKPJzr5/xjGe497znPWo0Ghof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gvcAFoPqXqLaBcuMjY35a+mf//mfu/e9732bHDtlSVFGUy1s9nuW1q+X1djGL3/5S+26666Bfcy6BJnhPawVj9frdYVh6Is2APz+qtdge53Za3HNmjXu5z//ubIs80VSRVH4e+nFEJ+sxudszavVagrDUFNTU3rGM56he++9V91uVw888EAgTc9F7/V6G+wP7ABVNTZM8hyYGwv/6gUAW6hq26PhFtqNRsNXH959991uq622Uq/XU6PRGAge2CknC+ZbVTWBhcWh1+spCIKBxI4FooIgULvdDoIg8AUaIyMjPgkwvPGp1Wo+WQAAi02j0dA222zjLrjgAr3gBS/wnTqk6fEY9XpdcRzP2PUDC4vdmxVFMVAsYW0T7fdv6+0DDzygCy64QJ/5zGf029/+NpippaUk3+2A4jQAC1m1TW81YW77V9tr/M+42IFkqe1toijyRcEUri0+1SSUNP0csMRRnuf68pe/rIsvvli33nprUJalH49izy3r6idp4DkI4LGzWGX1IEYQBEqSRN/4xjfcQQcdNBCXrCbMF8v+yQ6jVA+1VH8WvV5PnU5HT37yk/XQQw8FVqRdFIXyPB8oAKrVan48JwAAwKJjCc9GoyFpfXu76o3WwQcf7JxzrigKZ6amptymlGU58PlYmMqyHPjz8O+83+8755w7++yzXZIkPglkz68oimYMRHGqA8BCZ23xarWaoihSGIZ685vf7DqdjnPOuTzP/XW1em216yoWNvv9O7fh2uqc88+TNE1dWZYDz5eyLN0HPvABZ88vSWq32wPPOwBYqGbaRyRJMnD9O/30091vf/tbf02dnJx0zg3ubbIs83ta9rWLRzXO0e/3Nxr3SNPUPy/OO+88J8k/74YTdOxtgSdGHMcz3su+973v9dds55zr9Xqu0+lsEK9aDOzfnGWZf1+32x34c7/fd1//+ted/UwtDhxFkZIkGbhe0VUUAAAsaq1Wa8ak+emnn+6uu+46d88997gsy1yv1xu4GcvzfOBmtCiKgRsyLHzVoH2n03FpmvqP2XPBggppmrpf//rX7uKLL3arV6/eoGdsNYlOcAHAYvLsZz/b3X///RtcW52bXmtt/bVr6mIMBC1meZ67PM9dlmWu2+3691sC3axbt86vvfYcueuuu9xwkHExnLoBsHhZQZolzBuNhur1ul7xile4O++8cyAZnmWZ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fttmmmdZ5sctpWmqJEl0xRVXuB133NGPSwGwcXme6ytf+YoOPPBAF8ex0jSVtD5eBAAAFpb4kT8FABamPM81MTGhdrutXq+noih8BV+WZer3+9p6663dc5/7XMVxrNe+9rVqt9sqioLTO1j0LChnBSdRFGl0dFS9Xk9LlizRN7/5Te21116amppSHMe+3XL1/wAWpyzLNmhxWa/X1e/39Y53vMOdffbZkuRn8HU6HX+SjgQ6FjtbR+3kaLvd1jve8Q794Ac/cF/60pcGjp8EQaAkSfysShtFBGBhsm5QjUZDnU7Hv/5t1FK329VJJ53kVq9erRUrVuj5z3++er2eyrIcOJkOYENJkihNU1133XU64IAD3B133BFU40cAAGBhIXkOYNGywH2321VZlmq32/5UTqvVUlEUuu6667T77rsPzD0Pw1DdbtdX7gOLVZZlSpJEURT510S9XleWZVqzZo1uuukm9+53v1vOOX3/+9/XfffdF0gicQ5AeZ4riiIVRaHR0VFNTEzooosucq985Sv9rD07CddqtfypHhLnWOwajYY/4Wavh263q3/6p3/S8ccf77761a8GdhpudHRU4+PjkqaL3gjuAwubFYNb1wmbY2vFNm9961vde97zHtVqNd8VqtFoqCxLP+MWwMzKsvR736997Ws6/PDD3d133x3QNhkAgIWJtu0AFq08z5UkiZ/tY4lzO+X2hje8we20004DM55tY0TiHJAPtEnygfwgCFSr1VSWpfbee2998Ytf1JVXXqlLLrlE0vRrpzqDEcDiY+tqNXH+8Y9/3L3uda9TrVZTt9tVrVZTEASq1+vqdDp+vIolBYHFrDqLtSxLNZtNZVmmz33uczrwwAOd3aeOj49rZGREkkiKAYtAtf16HMeq1Wp+HNn222/vXvOa16jZbCoMp0OB1dnntJ0GNs1eX1EUaaeddtIVV1yhVatWOZtBDAAAFhaS5wAWrUajoTRNfUBekkZGRpRlmQ488EB37rnn+vbs3W5X0nSwklOzwHSyvNFo+OS5tVTOskxTU1O+S0MURZqcnNSxxx6rI444wnW7XR+oA7A42XXDOrlcffXV7uUvf7mk6cK2ZrPp57NK0y3dbdyDzXIGFivnnL9/laZfRw8//LCazaZWrVqlSy65RKOjo86S5ZOTk2o0GnRtABaBsiw1NjYmaXo9zfNccRyr3+/rS1/6knbZZRdJ09cNa+c+OTkpSayvwKNgr5c0TbX//vvrqquuUpIkA6OIAADAwkDyHMCiZUF5axsrTW+G9t57b3f99df79tPWnsvmxNXr9bl82MAWwYpIWq2W0jT1p0FrtZra7bYP6pdlqZGREUVRpEsvvVSrV692tLYDFjdbRxuNhm655RZ3/PHHKwxD9Xo9xXGsXq+nKIr8bElpOkhprWWBxS5JEn8fm2WZli5dqjzPlaap9txzT1199dWKosifPO31eup0OpyMAxa4MAz9qAZper3N81yf//zn3UEHHaR+v6+yLP1pdGm6eJxT58Cjs3TpUknrOzvsv//++vjHP+4ajcbcPjAAAPCEI3kOYNEqisInzi0Yf8wxx7gf/vCHajabcs6pVqspDMOBdu1BEFBZjEWvXq8rTVM555QkiT+tYqdcGo2Gut2u7+pQlqV22mkn3X333TriiCOI0AGLWL/fV6vV0ve//323zz77+AI2S47biVkbr2KJ9CzLCPBj0bPXi7Vjl6ZPowdB4F8vBx10kK688kqX57myLPOnzrl/BRY229OGYegLZ37+85+7E088UWVZql6vD+xtq8WuADbN7kF7vZ5v4V6v13X66afrrW99KzeoAAAsMCTPASx41SpgO3GTJInCMPQByDiO9fa3v91deeWVkjQQVLA/V3FyB4tdGIa+I0NVHMf+9WEzV+3z7f/f+MY39Ja3vMUNfx2AhcGuC7b+WnGNJfBarZa+9rWvub333tufNrekXnWW8/CM5lqtRutpLHrD62WtVht43di97TOe8Qx94xvfcDZCxdifZ3qt0RkG2LLZemqvVbu/ttewvabjONbq1avd2rVr3U477aQoijbYz0rrO8GwtgKPbPj+1tbjIAj03ve+V+94xzvc8Ofaa4x4EgAA8w/JcwALlgUBrL10dY6btYGNokgjIyM699xz3fve9z4/t9lmnAOYHeeee64uu+wyt2TJEmdz4oIg8P8BmL+scMbWX2u5XhSF2u22rrjiCnfooYdKWh+AtNc9J8uBxyeKIk1NTSlJEh155JG6+eabnd33jo6OSppOsNtp9TiOfcKd9RfYsqVpqiAIVK/XVavV5JxTGIa+w0RRFFq2bJnbY4893Pe+9z2tXLnSJ9Y5XQ7MrnPOOUcf+chHXK1W80nz4e4OtVpNtVptoBPMTIUtAABg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otD8/HzocmHvrpdffrne/e53O2n7CLpfz4pWlmXqdru1eAew91pLdr/zzjvdG97wBvfa177WfexjHxua0ytph3bKqDdLWpSGz+dgMFCe5zrttNOG9vfsZ6uJJJhedn/o9XphpF211fnPf/5zXXXVVbr66qv1ve99z9n9ptvthiC7zR6vJuZIqkXy0T2x/x4LhP/sZz9zb37zm90b3/hG98hHPlLS6p6p/b30ej2VZalut8v7OzDG2N0HcJ+12+2QlW0L68c+9rEEDqeEZZWan/70p7rpppv0vve9T+9617ucZTGnaTr0EmbVZuPOqsitXbf3Xr/3e7/n3vOe9+zw0mmZtzubZ4d6K8ty6GVuZWUljKbI83xoFIFzbqidGbA3nXrqqSGJR9q+IUpL48lgyVnVGXw2JqXdbuvaa6/VGWecodtvv91JGqoUGnf9fl8zMzOSts82t/bcVpmSpqne+973ultuuSVUs0jS8vLyKA8d+4Ctrcqy1JYtW/SiF73I28YrsK9Y8PQZz3hGqK7jHXfyWYc0e/+TpJ/85Cc699xznb0PrKyshPFl0vaAUh0+H3bM3ns1m80w61qS3vjGN7pf/OIXWl5eDu/rlrSU53kt/vtw96rvqTZ+z3uvNE0VRZHm5ua03377eUtYq86wrsP+Dfau5eXl8FlYO/d78+bNOumkk/SoRz3KPfrRj3aShirS7dcWNC+KYugzVZd3mLuztkvDzMxMSBj45je/6S677DL94he/0J133qktW7ao1WopSRK1222Kz4AxxuoHwH1mCybvvbz3Ov/88z1VQdOl2Wyq0+nola98pR7zmMfoAQ94gHvZy17mut2uer2e5ufnw0LYZshVky3GmW2SWavc/fff35dlqde85jXugx/8oKTVhXG1ItA2JCZh8T/t7DNqcwFt/MDs7KxmZ2f1sIc9bGgHodp6jM0F7G3OOT3kIQ+RtHqvslmcEm0VJ421O5S2P5euv/56vehFLwrtEC2BK47joYqxcdbpdIbmtpuyLMNM1pWVFR133HHuO9/5Tniuzs3NjeR4se9EUaRer6coirTffvvpfe97nyQRvMQ+MRgMFMdxuOc897nPlcTablrYee73+4rjWDfffLN+67d+S71eb4eZtNVgR13Gdtm7apZloatLp9PR/Py8+v2+zjrrrHD/re71WBc51Jt1NrJza2P1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ADAtXDy02r49CAL1ej1dffXVuvDCC31HIWutX+MkMRN9K8iyzHd4coUNRVH4ooeyLLVq1So98MADvruqS6ADmDoMVQIwK7iZcW5jEASBD8BNDvi/4hWv0IYNG4zb9AGYn9ycSVcp3Wg09MpXvtLcdNNN9nnPe56GhoYkbWytmee5Wq2Wr8AGZitjjFqtlv9zGIb+htwYoyVLlujQQw817vTctttua9etW2fcfGMA2BJXwBoEgRqNhhYvXmze/va326uuumogOe72541Gw7/PJRqB2coVbVtr/WiTLMtUFIVqtZqiKFJZln7N7ff7OvbYY3Xvvfcakg8AgOni7vGq93phGKosS11//fXmwgsvtIcccoiMMTLG+DWuLEsVRUECfYq5fXOn01G73fbxqH6/738ed999ty9OdS342VcDU4uT5wBmrGrbdlcV6bjZLkVR+NOjrVZLxx57rBYvXmzcTPMqY4w/FQNgbms2m0qSRFmW+SR5v99XGIY68sgjdeWVV+qCCy7Qfffd50/kumQjiXPMdm5ddGMNXHu+oijU6/X0lre8xReVxHGsdevWGXealJnFAB7N8PCwyrJUt9tVGIa65pprzD/90z/5a4/jWrq7AjWKczDbxXHsu5tJE+3Y4zhWo9FQEATq9/vK81y33367LrnkEn3qU5/S+eefbyTa3gIAppc71SzJj+Jxp5zdHs5aq36/78dfugMJmFquALXaPVGaGIvkChkuv/zygcS5RIdVYKpx8hzAjFU9Aec2eG7+SxzHflMRhqGKotBXv/pVnXPOOUaa2GBUZ7VSjQfMLy5p2Gg0ND4+7q8JQRDo5ptvNgcccIBarZZ23313e+mll2q77bZTnue+VRk3iJjN3EnPZrPpW7e7m+7PfvazWrx4sXGzza21iqLIJ7a4AQfwaMbGxiTJX1eKotDXv/518973vtfutddevs1ku932J2QozMFcEYahoiga6KTgTn/V63V95jOf0ec+9znj7lHdnpLkOQBgOrkDRe53Sb5TXxRFWrJkiXbbbbeBBG5ZluzjtpI0TVWr1SRNFMO3221Za9Xr9RRFkc4///yBEUmS/J67+j4ATx6yScAUqm5IjjjiCHv22Wez4fgTudkum5uR6DYWeZ7rhhtu0H777TdwTdtcwpykADB/uIS5uyF0NxXVwpwgCLRhwwZbq9VUr9f9NYKCG8xm4+PjGhoaUlEUA6cGzjvvPB1zzDHGzR+WNu5V3GiUaiU7AEzWbDbV6/U2KVR1a+1DDz1kt99+ez/72RkdHdXQ0BD3QpjVqoFtJ8sypWmqdrutH//4x/rrv/5rU319tNttdTqdgdgAAABbk4tvuHXIxUSqa9MxxxxjTznlFLVaLQVB4BO1rugaW4dLiEsb9x2LFy/W85//fFPtzup+PtVRhQCeXNy5ApixXEVkEASbVNF1u13FcayyLHXnnXfqda97nZEmTgK4E3fV4ATt2oH5JY5jnzh314/qNcAFPsuy1Pbbb2+23XZbs27dOp88BGazoaEhf5L8jjvu0NOf/nTttNNOOvbYY02e536ddM/3RqPh27qTOAfwSFxnlzRNFQSBarWa2u22b/256667mte85jW64YYb/OePjo5qwYIF7MUx61UT5+75XJal2u22li9frqOPPlrS4CnzJEkUhiHPfwDAtJkcEzXGDKxNxpiBQke3jlH0uHVU9w3u7V6vp1qtpl6vp//8z//0MXLXut0dCCFxDkwdroAAZqxqy/ZqK9nx8XHdf//9etaznqVdd91VL3nJS8zY2JhPePX7fVXb0W5u9jkbQGBuczcQWZZt0mrMWqs0TWWMURRFfqbX1Vdf7T8OzGbuhIAxRm984xu1YcMGs379euMS471eTwsXLrSuu0uappIm1kdGFgB4JG4tjaJIYRgqTVN1Oh1/QilJEv32t781+++/v9l5552V57kWLFigsiyZeY45wa2lxhilaerHF/zN3/yNRkZGTBRFKstSQRAoDENfzAYAwHQKw3CgJbuLoW6u06dL1FaTtJg6cRwPjB5MkkTNZlOStM8+++jf//3fjdtrW2uVZZmstf5zAEwNskcAps3kBJVLdrlEudvAufnDLsgfBIEOPfRQ3X///WbZsmWm2+367+dOmD7SyTn3fQDMH9UTte7aY60dCIC+//3v1/7776+//uu/1vLlyyXJt9ysFvC464ebAVbtjFFtYQs8Xo+lW0p1nXPrmltHwzBUWZZ697vfrZUrV5rq57nE18jIiH+/e067G3EA2JLqKZfq9cK93+3ZJWnZsmXmk5/8pKSNXaOkwbW1inmNmG5FUWwyS3QyV6Sd57nCMNRpp52mgw46SNdff71x75c0sEekMBMAMN2KohjYu7n1yo30+tWvfqX3v//9AyNKXKchTD03llTaWKx6+umn6+677zadTsfvm6v7Z5dwBzA1GFoBYNoYY3xi3P253+/7drJOHMcD7z/00EN111130VcZwOPmqqiNMf4m8sEHHzQPPviggiBQvV633//+91Wv1/3No2s76yp+qxXaLjhar9fV6/WoAMYT8mijA8qyVJIkiqLIP38bjYaCINDpp5+uq666StZaXXDBBX6kiXuOUjwGYCq5oGytVlOapjr77LP18MMP62lPe5re+973avfdd1e9Xle321Wr1ZI0EbzNsoy1E9PO7e1GR0fVaDRUq9X8mttsNv29a1EUesc73qELL7zQFEVB8SQAYFYLgkAjIyPm4osvtqeffrovJqvX6/4UOqZOtWAhSRLf1eass85irBowjbjyAVPIGOOrzI844gh79tlnU7E3iTtJXk2ij46OKo5jNZtN/3FpIrB2xhln6EMf+pCJoogNBIAnRRAEm4yHaDab+t//+3/bLMv0l3/5l3rpS1/qA6jV61KWZf7GJssy36IT2BryPPcn4JIk0fr167XHHntodHTUuGR5GIZya6Yr+uB0OYCpEsexsizzczTLsvTve+lLX2qvueaagaBgdU0Fplun01Gr1XrUJMEPfvADvf3tb/ef5J7jAADMRu5gQb1e1//5P//HHn/88QqCQOPj4xoaGpruhzfnuf1wp9NRs9n09+077LCDVq1aRf4OmCa8+IApRPL80Vlr1e121W63/cwWV23nkgJLlizR6tWrFQSBXvKSlxiXmKK1I4DHq3p9dlwS3VVWF0WhIAhUq9V0991322c84xmStEnltQuWula11dbYwFQYHR1Vu92WtPF5u2zZMp1wwgk644wzfIFZdS7a5p7zADAVJl9vGo2G+v2+JOm73/2ufdOb3qShoSEVRaEoinwynUQ6ZoqiKLRhwwZtu+22fs83MjKipUuXKgxDHXnkkbrjjjuMK0xzez+6uwAAZqtWq6Vut6unPe1pdsWKFf4estotCFOn2nHVWquzzz5bRx11lKnX63S4AaYJd6YApk2apjLGqN1uK01TnzjPsmzgNN0rX/lK7bfffuYlL3mJkSaCGbQMAvBEuKC+q7CWNs6mLMtSxhh/0rzf7+sTn/iEkiRRURTqdDqSJk4nWWsHkubGGKVpOm3/LswPCxYsUBiGMsbovPPO08KFC83OO+9svvWtbw3MW3Un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Lcsy1et1JUmier2uiy++2Bx11FF21113lbVWH/nIR3zsoiiKOd9dzRijNE0Vx7E/mS9Jp512mm644QYfH3D72CzL1G631el0SJwDMxh3gsAUmi0nz6WJwEWe5/40QBzHPlh0++236+STT9YPfvADMz4+7qv3XVBic8lyt4kCAGyqWl1cPYUehqFPqFZvrv6neMnW63UdcsgheuYznznw/dxNK6ZOtZpcki655BItW7ZMtVpNN954o0499VQjbWwV2+v1/Oe6n2UYhirLUsaYTZLm1e9NAh0AHpm7p9pSp45HK+ZtNpv66Ec/ag899FDtvffevnNLWZa+cLjKXbtJpj853M9tc/+nk4Ps//Ef/+H3Rj/4wQ/0y1/+0rj77Ha7rV6v538+1lrFcewLJYwxajabyrKMxDkAAI+TW6vdOuvW1AULFmh0dHTgc9vttq677jr7vOc9b6s/zukyuWNdr9fTgw8+qL333tskSTKQXM+yzMfVAcxs3PkBU2imJ89dYMKd2qiePh8dHdUFF1ygs88+Wz//+c+NNNhKdmhoSOPj475SLooihWFIwhwAHqOFCxfaTqfju3i4JLo7YVUUhay1vhjJXYM//elP21e84hXK81zGGB188MG+tak7wTWT1prZygXde72erx7/r//6Ly1cuFBlWerDH/6w7rrrLlO98d1mm23shg0bBvbXjUZDSZLIWuu7C2xONSABANiyasJ18sllaTCQW6vVVJal8jz3CfHJSdRms6mdd97Z7rnnnjr44IMlSccee6z//lmWbTLCA4/f5vYqrpA7jmMtWbJES5cu1fj4uIqi0Hve8x71+33T6/UUBIGGh4ftyMiIL1jr9/v+nrSqmkSXtjwyBwAAPDau81273fZ7rXq9LmvtwAnqv/iLv7Bf/epXNT4+rte97nVqNBrT9ZC3mmqh5R133KF3vvOduv766x8x97a54gMAAOaFahX9EUccYYuisDNJnuf+7aIobL/ftzfeeKP9wAc+YN0JxsmBouopAPexaksa97653pIHAJ4srtNHdc1wb1dnZbnPdR8PgkDbb7+9XbZs2YxbX+aCoihsr9ezy5Ytsw899JBdvHixrf5s3DrnurVM/tm1Wq2Bn93kzgBu5AmFDgDwxFXXUXd9DsPQv+2CtpPXWzf7vKrZbOqee+6xy5Yts8uWLbP33Xef7Xa7A/dOePKkaWrXrFljH3jgAbt06VL79a9/3VdDuLXUraHuZxfH8cD66dbhKIo22x2A8TYAADx+bgzZZNV4sDSxXlfX4SAI9OlPf3q6txpTbtWqVfZXv/qVPfbYY+3w8LDCMNxk71KNl1f/L4kHAADmLXejfvjhh1trJ4IDSZJYa60ty3KTBbcsS//+zSVDiqKwRVFs8XPKshx4X/Xtbrfr3x4dHbXWWpskiX3wwQftcccd54MUm9sQAQBmFpd8dXbbbTd77LHH2jPOOMPedddddnR01BZFMRDsz7Jss2vO5PVo8ufleb7FBP3kr3dfu7n16E9J8k/++upjqf59eZ5vMaHh3l/9f3DfM03Tge+f57kdGRmxvV7Pjo+P216vZ88880xbnXk7OSEOAJh7arXaQAK+0WjojDPOsN1u1/b7fbt27VpblqVN09Sve27tc+tKlmUDn/On2ty6u7l18bGurdW1Os/zze4H3Meqf3Z/h7Ub13f3OZMLsd3Xbe6xV+9fnbGxMbt69WqbpqndddddabsCAMAs54r8nVqtpm222caOj4/79b/69uR7ebfXqMYUkiQZ2FdkWbbJXqQa19jcr+rnVWPj1T2P+769Xm/g4+6xuFi+4/Z4eZ7b7bff3lZP15MQBwDgUVSr7d7xjncMLLKTF90tJTDyPLf9ft/2+/1NkgPVP28pUNHv9+1kSZLY5cuX20MPPdS6KkG3wameygAAzHzGGEVRpCiKFMex6vW6r2b++Mc/7teB6vqwufWm+jFnc0H5za1Fkz+n1+vZNE03+Tv+1AT6n8IlFTb3eNyaW00WuJvibrfrE+l77723df+Hw8PDvlqcE2sAMD9MPjHl7o3a7baazaZfZ1/wghf4JHQ1wJum6Sb3X2ma+rXpsQZ3J69vVXmebxJIduuZC/xuLllt7eaT2NX1c/L3qwaU3fsmf93mHmdZlv7/ZnP7iMWLF9vtttvONhqNTU6tAQCA2cXtnSYnz6WJBHqr1dIzn/lMe8YZZwzck7v7dLd3cvuGyUl1t8eaXPxX3Yc9ksl7nH6/P5CEL4piIE7v3t/pdAb2QdXH6txzzz222WxutpPg5LcBAMD/cCcW4jjW3/7t3/qTbG5hdoGUybZ02s5xrWSrkiTZZGNRTY7ceeed9nOf+5x98YtfbBcuXGiljSfMh4eHBzY61d8BADPPo43GcNf3bbfd1u6zzz72b//2b+3pp59u77///k1uLt16VD2J7dYPd+M6OdA+uQAsy7LNBvKra9Lkz/9TgvvVpLh7bI90o7y56vVer+dvdHu9nj333HPtokWL7HOe8xy700472R133NFObq0mbWzp64IArI8AMD8EQaBaraYgCNRsNgdawIdhqF122cU++9nPts961rNss9nUN77xDWvtxpNIbizW5PVpcpJ5cjeVyeunCyBvqRvLowWN3ffYXMB58tq9udPymzs9nyTJQCc09/bk/YG1E4HnL33pS3a77bazO+64o332s59tn/rUp1r3f+yQRAcAYHbbXPJc2hi/qNVqMsbo3e9+98B+pHqKe/JeqHpSvbpfqe5rXJH+ln65r3H7lUfqDDQ5NuIe1+THd8ghh9gddtjBbrvttnby/0E1ZsBYU2D2IvoHTKEoipTnuWq1mt761rfa73//+/5jZVk+YhuXsiz929ZalWUpa61v02uMUZqmfl5qdWF++OGHtWLFCl144YX6wx/+oFtvvVUrVqww3W5X0sZWv1mW+T+7v6/RaKjf7z+p/w8AgKnhkuR5nkvaGOjv9/tqNpvq9XqSNp6czrJMQ0ND+rM/+zO77bbb6nnPe55e/vKXa//999cuu+wiaWLNceuNk+e5rLUDs0SttcrzfJP28VVlWfr1y91IT76ZdNzfa619TDeY7nu7/4OiKPxjlKR+v68wDBXHsbrdro444gitX79eQRBoaGhIf/jDH/Tggw8aY4z/95ZlqVqtpjRN/Z+ra7kkpWn6qI8NADA7ufsst65uSRzH/l7K3Y/tuuuudocddtCiRYuUZZk6nY6e+tSn6t/+7d+08847K8/zTcZjufu8LQWbHyu3Jm/u5Fd1zS2KYpN7R/cYJPmPVR9rv99Xo9FQmqaKokhJkqjZbCrLMr+/KIpCknTHHXdoxYoVuvvuu3X//fdr5cqVWr58ue655x4tW7bMuDW+KArFcezXaAAAMDe4+313b+9U905Pe9rT7J/92Z/pGc94hr73ve9J2rjfcDGGalwgSRLFcexj6VmWKQiCx9whLssylWXpO/RVY/JFUSjLMjUaDSVJsslM8iRJVK/XlSSJ/uZv/kadTkcLFizQddddp7Vr15pqfMDtv1wMRBqMuQOYXUieA1tBEAQ69NBD7fnnny9p44bAbSTyPPeBDHfq7ZG4r4njWA8/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cRUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/vz04JAAAAAAQ9P+1NwwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnAVRxXEPgP9oAwAAAABJRU5ErkJggg=="
              alt="ARPi"
              style={{ height: 44, width: "auto" }}
            />
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
        <span style={{ opacity: 0.4 }}>v1.3 — Belgique · Francophonie · International</span>
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

      {/* PITCH BLOCK */}
      <div style={styles.pitchBlock}>
        <div style={styles.pitchHeader}>
          <div style={styles.sectionTitle}>Pitch du film <span style={{ color: "#E8920A", fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>— analyse automatique par IA</span></div>
        </div>
        <textarea
          style={styles.pitchArea}
          placeholder="Collez ici le pitch ou synopsis de votre film (quelques lignes suffisent)..."
          value={pitch}
          onChange={e => setPitch(e.target.value)}
          rows={4}
        />
        <div style={styles.pitchActions}>
          <button
            style={{ ...styles.pitchBtn, opacity: canAnalyze ? 1 : 0.4, cursor: canAnalyze ? "pointer" : "not-allowed" }}
            onClick={canAnalyze ? () => onPitchAnalyze(pitch) : undefined}
          >
            {pitchState.loading ? (
              <span style={styles.loadingDots}>Analyse en cours<span className="dots">...</span></span>
            ) : "Analyser le pitch"}
          </button>
          {pitchState.resume && (
            <div style={styles.pitchResume}>
              <span style={{ color: "#7B9E87", marginRight: 6 }}>Détecté :</span>{pitchState.resume}
            </div>
          )}
          {pitchState.error && <div style={styles.pitchError}>{pitchState.error}</div>}
        </div>
      </div>

      <div style={styles.divider}>
        <span style={styles.dividerLabel}>ou renseignez les critères manuellement</span>
      </div>

      <div style={styles.matcherGrid}>
        <Section title="Format" required>
          <TagCloud
            options={["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "série", "essai", "hybride"]}
            selected={matchForm.formats}
            onToggle={v => setMatchForm(f => ({ ...f, formats: toggle(f.formats, v) }))}
          />
        </Section>

        <Section title="Genre / Forme">
          <TagCloud
            options={["drame", "documentaire", "comédie", "thriller", "expérimental", "animation", "essai", "hybride", "social", "indépendant"]}
            selected={matchForm.genres}
            onToggle={v => setMatchForm(f => ({ ...f, genres: toggle(f.genres, v) }))}
          />
        </Section>

        <Section title="Thèmes">
          <TagCloud
            options={["société", "identité", "politique", "diaspora", "francophonie", "mémoire", "droits humains", "environnement", "art", "famille", "jeunesse"]}
            selected={matchForm.themes}
            onToggle={v => setMatchForm(f => ({ ...f, themes: toggle(f.themes, v) }))}
          />
        </Section>

        <div style={styles.matcherRow}>
          <Section title="Langue du film">
            <select
              style={styles.select}
              value={matchForm.langue}
              onChange={e => setMatchForm(f => ({ ...f, langue: e.target.value }))}
            >
              <option value="">Toutes</option>
              <option value="français">Français</option>
              <option value="néerlandais">Néerlandais</option>
              <option value="anglais">Anglais</option>
            </select>
          </Section>

          <Section title="Ancrage géographique prioritaire">
            <select
              style={styles.select}
              value={matchForm.region}
              onChange={e => setMatchForm(f => ({ ...f, region: e.target.value }))}
            >
              <option value="">Tous</option>
              <option value="belgique">Belgique</option>
              <option value="francophonie">Francophonie internationale</option>
              <option value="international">International</option>
            </select>
          </Section>

          <Section title="Votre profil">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { val: "réalisateur", label: "Réalisateur·trice" },
                { val: "producteur", label: "Producteur·trice" },
                { val: "auteur", label: "Auteur·rice" },
              ].map(opt => (
                <label key={opt.val} style={styles.checkLabel}>
                  <input
                    type="checkbox"
                    style={styles.checkInput}
                    checked={matchForm.profil.includes(opt.val)}
                    onChange={() => setMatchForm(f => ({ ...f, profil: toggle(f.profil, opt.val) }))}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </Section>
        </div>

        <Section title="Spécificités personnelles">
          <div style={{ marginBottom: 6, fontSize: 12, opacity: 0.45, fontStyle: "italic" }}>
            Certains festivals proposent des sections ou prix dédiés — ces critères affinent le matching.
          </div>
          <TagCloud
            options={["issu·e de la diversité", "jeune créateur·trice (- de 35 ans)", "premier film", "cinéaste femme", "cinéaste LGBTQ+", "film à petit budget"]}
            selected={matchForm.specificites}
            onToggle={v => setMatchForm(f => ({ ...f, specificites: toggle(f.specificites, v) }))}
          />
        </Section>
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button
          style={{ ...styles.matchBtn, opacity: canRun ? 1 : 0.4, cursor: canRun ? "pointer" : "not-allowed" }}
          onClick={canRun ? runMatch : undefined}
        >
          Lancer le matching
        </button>
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
        {results.map((f, i) => (
          <ResultCard key={f.id} festival={f} rank={i + 1} onSelect={() => onSelect(f)} />
        ))}
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

        <div style={styles.matchBar}>
          <div style={{ ...styles.matchBarFill, width: `${pct}%` }} />
        </div>

        <div style={styles.reasons}>
          {f.reasons.map(r => (
            <span key={r} style={styles.reasonTag}>{r}</span>
          ))}
        </div>

        <div style={styles.resultFooter}>
          <span style={styles.deadlineLabel}>Deadline : <strong>{f.deadline}</strong></span>
          <span style={styles.feesLabel}>{f.frais}</span>
          {f.soumission && (
            <a href={f.soumission.url} target="_blank" rel="noreferrer" style={styles.soumissionPill}>
              {f.soumission.plateforme}
            </a>
          )}
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
          <button
            style={{ ...styles.ccaFilterBtn, ...(filters.cca ? styles.ccaFilterBtnActive : {}) }}
            onClick={() => setFilters(f => ({ ...f, cca: !f.cca }))}
          >
            Aide CCA uniquement
          </button>
        </div>
      </div>

      <div style={styles.catalogueGrid}>
        {festivals.map(f => (
          <CatalogueCard key={f.id} festival={f} onSelect={() => onSelect(f)} />
        ))}
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
          <FicheBlock titre="Description">
            <p style={{ lineHeight: 1.7, opacity: 0.85 }}>{f.description}</p>
          </FicheBlock>

          <FicheBlock titre="Formats acceptés">
            <div style={styles.tagRow}>
              {f.formats.map(fmt => <span key={fmt} style={styles.fmtTagLg}>{fmt}</span>)}
            </div>
          </FicheBlock>

          <FicheBlock titre="Genres & formes">
            <div style={styles.tagRow}>
              {f.genres.map(g => <span key={g} style={styles.genreTag}>{g}</span>)}
            </div>
          </FicheBlock>

          <FicheBlock titre="Thèmes">
            <div style={styles.tagRow}>
              {f.themes.map(t => <span key={t} style={styles.themeTag}>{t}</span>)}
            </div>
          </FicheBlock>
        </div>

        <div style={styles.ficheSide}>
          <div style={styles.ficheSideCard}>
            <FicheStat label="Deadline de soumission" value={f.deadline} accent />
            <FicheStat label="Édition" value={f.edition} />
            <FicheStat label="Frais d'inscription" value={f.frais} />
            <FicheStat label="Langues acceptées" value={f.langues.join(", ")} />
            <FicheStat label="Profils concernés" value={f.profils.join(", ")} />
            {f.accréditations.length > 0 && (
              <FicheStat label="Accréditations" value={f.accréditations.join(", ")} />
            )}
            {f.soumission && (
              <div style={styles.ficheSoumission}>
                <div style={styles.ficheStatLabel}>Soumettre via</div>
                <div style={styles.soumissionPlateforme}>{f.soumission.plateforme}</div>
                <div style={styles.soumissionNote}>{f.soumission.note}</div>
                <a href={f.soumission.url} target="_blank" rel="noreferrer" style={styles.soumissionBtn}>
                  Accéder à la plateforme →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FicheBlock({ titre, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={styles.ficheBlockTitre}>{titre}</div>
      {children}
    </div>
  );
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
        <button
          key={o}
          style={{ ...styles.tag, ...(selected.includes(o) ? styles.tagActive : {}) }}
          onClick={() => onToggle(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

const OUTILS = [
  {
    id: "shortfilmdepot",
    nom: "Shortfilmdepot",
    url: "https://shortfilmdepot.com/fr",
    logo: "SFD",
    couleur: "#4A7C6F",
    type: "Soumission",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "expérimental"],
    perimetre: "International — forte présence francophone",
    langue: "Français / Anglais",
    tarif: "Tarifs par festival, affichés clairement. Gratuit pour certains.",
    ethique: true,
    description: "Plateforme indépendante, administrée par l'association Sauve Qui Peut le Court Métrage (Clermont-Ferrand). Repose sur une charte éthique qui filtre les festivals partenaires. Interface en français, pensée pour les cinéastes.",
    forces: ["Court-métrage toutes formes", "Charte éthique", "Interface en français", "Réseau international"],
    limites: ["Court-métrage uniquement", "Pas de long-métrage ni documentaire long"],
    ideal: "Réalisateurs et auteurs cherchant à diffuser leurs courts-métrages en festivals engagés.",
  },
  {
    id: "docfilmdepot",
    nom: "DocFilmDepot",
    url: "https://www.docfilmdepot.com",
    logo: "DFD",
    couleur: "#6B5B8A",
    type: "Soumission",
    formats: ["long-métrage documentaire", "court-métrage documentaire", "essai", "webdoc", "série documentaire"],
    perimetre: "International — ancrage francophone fort",
    langue: "Français",
    tarif: "Système de timbres numériques. Certains festivals gratuits.",
    ethique: false,
    description: "Développée par Ardèche Images (organisateurs des États Généraux du Film Documentaire de Lussas). Plateforme de référence pour le documentaire francophone. Permet d'enregistrer un film une fois et de l'inscrire à plusieurs festivals.",
    forces: ["Documentaire toutes formes", "Réseau francophone solide", "Interface simple", "Export Excel des inscriptions"],
    limites: ["Documentaire principalement", "Moins de festivals internationaux anglophones"],
    ideal: "Réalisateurs et producteurs de documentaires cherchant les festivals francophones majeurs.",
  },
  {
    id: "filmfest",
    nom: "FilmFest Platform",
    url: "https://www.filmfestplatform.com",
    logo: "FFP",
    couleur: "#8A6B3A",
    type: "Soumission",
    formats: ["court-métrage fiction", "court-métrage documentaire", "court-métrage animation"],
    perimetre: "France — festivals de catégorie 1 principalement",
    langue: "Français",
    tarif: "Système de crédits : 3€/crédit, packs dès 14€ pour 5 crédits.",
    ethique: false,
    description: "Service hébergé par l'Agence du Court Métrage (France). Porte d'entrée quasi-obligatoire pour les festivals français de catégorie 1 (Clermont-Ferrand, Brest, Grenoble…). Réseau de plus de 75 festivals.",
    forces: ["Festivals français catégorie 1", "Gestion des candidatures centralisée", "Suivi en direct"],
    limites: ["Court-métrage uniquement", "Essentiellement France", "Payant par crédit"],
    ideal: "Cinéastes francophones visant les circuits professionnels français reconnus.",
  },
  {
    id: "cinando",
    nom: "Cinando",
    url: "https://cinando.com",
    logo: "CND",
    couleur: "#1A3A5C",
    type: "Réseau professionnel B2B",
    formats: ["long-métrage fiction", "long-métrage documentaire", "série", "tous formats professionnels"],
    perimetre: "International — lié au Marché du Film de Cannes",
    langue: "Français / Anglais",
    tarif: "Abonnement annuel. Accès inclus avec accréditation au Marché du Film.",
    ethique: false,
    description: "Lancé en 2003 par le Marché du Film de Cannes. Refonte complète début 2026. Plateforme de réseautage B2B pour les professionnels : contacts, projets, projections sécurisées, participants aux marchés. Pas une plateforme de soumission directe — outil de positionnement stratégique.",
    forces: ["Réseau mondial de l'industrie", "Base de données exhaustive", "Streaming sécurisé B2B", "Marché du Film intégré"],
    limites: ["Pas de soumission directe aux festivals", "Payant", "Orienté vente et coproduction"],
    ideal: "Producteurs cherchant des partenaires de coproduction, de distribution ou de ventes internationales.",
  },
  {
    id: "festivalscope",
    nom: "Festival Scope Pro",
    url: "https://pro.festivalscope.com",
    logo: "FSP",
    couleur: "#3A1A1A",
    type: "Visibilité post-sélection",
    formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage", "tous genres"],
    perimetre: "International — réseau de festivals partenaires",
    langue: "Anglais / Français",
    tarif: "Gratuit pour les films sélectionnés par un festival partenaire.",
    ethique: false,
    description: "Plateforme dédiée aux professionnels du cinéma indépendant. Les films y arrivent après sélection par un festival partenaire — pas de soumission libre. Sert à augmenter la visibilité d'un film déjà sélectionné auprès de distributeurs, agents de ventes et programmateurs.",
    forces: ["Visibilité internationale post-sélection", "Réseau de festivals prestigieux", "Screening room sécurisée"],
    limites: ["Accès conditionné à une sélection préalable", "Pas un outil de soumission"],
    ideal: "Réalisateurs et producteurs avec un film déjà sélectionné, cherchant à maximiser sa circulation internationale.",
  },
  {
  id: "filmfreeway",
  nom: "FilmFreeway",
  url: "https://filmfreeway.com",
  logo: "FF",
  couleur: "#1DB954",
  type: "Soumission",
  formats: ["long-métrage fiction", "long-métrage documentaire", "court-métrage fiction", "court-métrage documentaire", "court-métrage animation", "série", "expérimental"],
  perimetre: "International — plus de 12 000 festivals dont 236 accrédités Oscar/BAFTA",
  langue: "Anglais / Multilingue",
  tarif: "Gratuit pour les cinéastes. Frais selon les festivals.",
  ethique: false,
  description: "Plateforme de référence mondiale pour la soumission en festivals. Couvre tous les formats et toutes les régions. Utilisée par Sundance, TIFF, Berlinale et la majorité des festivals anglophones et internationaux.",
  forces: ["Catalogue mondial (12 000+ festivals)", "Gratuit pour soumettre", "Tous formats et durées", "Festivals Oscar/BAFTA accrédités"],
  limites: ["Interface en anglais", "Pas de charte éthique — qualité variable des festivals", "Très grand volume, concurrence élevée"],
  ideal: "Tout cinéaste cherchant une diffusion internationale, notamment vers les marchés anglophones.",
},
];

function OutilsView() {
  const [selected, setSelected] = useState(null);
  const outil = selected ? OUTILS.find(o => o.id === selected) : null;

  return (
    <div style={styles.outilsWrap}>
      <div style={styles.outilsIntro}>
        <h2 style={styles.h2}>Outils de soumission</h2>
        <p style={{ opacity: 0.6, fontSize: 14, marginTop: 8, lineHeight: 1.7, maxWidth: 640 }}>
          Ces plateformes complémentaires permettent de soumettre vos films aux festivals ou de renforcer votre positionnement professionnel. La plateforme ARPi les utilise comme étape suivante après le matching.
        </p>
      </div>

      <div style={styles.outilsGrid}>
        {OUTILS.map(o => (
          <div
            key={o.id}
            style={{ ...styles.outilCard, ...(selected === o.id ? styles.outilCardActive : {}), borderLeftColor: o.couleur }}
            onClick={() => setSelected(selected === o.id ? null : o.id)}
          >
            <div style={styles.outilCardTop}>
              <div style={{ ...styles.outilLogo, background: o.couleur }}>{o.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.outilNom}>{o.nom}</div>
                <div style={styles.outilType}>{o.type}</div>
              </div>
              {o.ethique && <span style={styles.ethiqueBadge}>Charte éthique</span>}
            </div>
            <div style={styles.outilFormats}>
              {o.formats.slice(0, 3).map(f => <span key={f} style={styles.fmtTag}>{f}</span>)}
              {o.formats.length > 3 && <span style={styles.fmtTag}>+{o.formats.length - 3}</span>}
            </div>
            <div style={styles.outilTarif}>{o.tarif}</div>
          </div>
        ))}
      </div>

      {outil && (
        <div style={styles.outilDetail}>
          <div style={styles.outilDetailHeader}>
            <div style={{ ...styles.outilLogo, background: outil.couleur, width: 52, height: 52, fontSize: 15 }}>{outil.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{outil.nom}</div>
              <div style={{ opacity: 0.5, fontSize: 13 }}>{outil.perimetre} — {outil.langue}</div>
            </div>
            <a href={outil.url} target="_blank" rel="noreferrer" style={styles.siteBtn}>Accéder →</a>
          </div>

          <p style={{ lineHeight: 1.75, opacity: 0.85, marginBottom: 24, fontSize: 14 }}>{outil.description}</p>

          <div style={styles.outilDetailGrid}>
            <div>
              <div style={styles.ficheBlockTitre}>Formats couverts</div>
              <div style={styles.tagRow}>
                {outil.formats.map(f => <span key={f} style={styles.fmtTagLg}>{f}</span>)}
              </div>
            </div>
            <div>
              <div style={styles.ficheBlockTitre}>Points forts</div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", lineHeight: 2, opacity: 0.8, fontSize: 13 }}>
                {outil.forces.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div>
              <div style={styles.ficheBlockTitre}>Limites</div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", lineHeight: 2, opacity: 0.6, fontSize: 13 }}>
                {outil.limites.map(l => <li key={l}>{l}</li>)}
              </ul>
            </div>
            <div>
              <div style={styles.ficheBlockTitre}>Idéal pour</div>
              <p style={{ opacity: 0.8, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{outil.ideal}</p>
            </div>
          </div>
        </div>
      )}

      <div style={styles.outilsNote}>
        La plateforme ARPi identifie, pour chaque festival du catalogue, la plateforme de soumission recommandée. Ces informations apparaissent dans les fiches festival et dans les résultats de matching.
      </div>
    </div>
  );
}

function ProfilView({ matchForm, setMatchForm, userFestivals, setUserFestivals, onGoMatcher }) {
  const toggle = (arr, val) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const emptyForm = { nom: "", ville: "", pays: "", site: "", formats: "", deadline: "", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("profil"); // profil | proposer

  const handleSubmit = () => {
    if (!form.nom.trim()) return;
    const nouveau = {
      id: Date.now(),
      ...form,
      source: "membre",
      dateAjout: new Date().toLocaleDateString("fr-BE"),
    };
    setUserFestivals(prev => [nouveau, ...prev]);
    setForm(emptyForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={styles.profilWrap}>
      <div style={styles.profilHeader}>
        <h2 style={styles.h2}>Mon profil</h2>
        <p style={{ opacity: 0.5, fontSize: 14, marginTop: 6 }}>Vos préférences sont mémorisées pour affiner vos prochaines recherches.</p>
      </div>

      <div style={styles.profilTabs}>
        {[{ key: "profil", label: "Profil & préférences" }, { key: "proposer", label: "Proposer un festival" }].map(t => (
          <button
            key={t.key}
            style={{ ...styles.profilTab, ...(activeTab === t.key ? styles.profilTabActive : {}) }}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
            {t.key === "proposer" && userFestivals.length > 0 && (
              <span style={styles.profilBadge}>{userFestivals.length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "profil" && (
        <div style={styles.profilContent}>
          <div style={styles.profilGrid}>

            {/* Profil principal */}
            <div style={styles.profilCard}>
              <div style={styles.profilCardTitre}>Rôle principal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { val: "réalisateur", label: "Réalisateur·trice" },
                  { val: "producteur", label: "Producteur·trice" },
                  { val: "auteur", label: "Auteur·rice" },
                ].map(opt => (
                  <label key={opt.val} style={styles.radioRow}>
                    <input
                      type="radio"
                      name="profil"
                      value={opt.val}
                      checked={matchForm.profil === opt.val}
                      onChange={() => setMatchForm(f => ({ ...f, profil: opt.val }))}
                      style={{ accentColor: "#E8920A" }}
                    />
                    <span style={{ marginLeft: 10 }}>{opt.label}</span>
                  </label>
                ))}
                <label style={styles.radioRow}>
                  <input
                    type="radio"
                    name="profil"
                    value=""
                    checked={matchForm.profil === ""}
                    onChange={() => setMatchForm(f => ({ ...f, profil: "" }))}
                    style={{ accentColor: "#E8920A" }}
                  />
                  <span style={{ marginLeft: 10, opacity: 0.5 }}>Non précisé</span>
                </label>
              </div>
            </div>

            {/* Spécificités personnelles */}
            <div style={styles.profilCard}>
              <div style={styles.profilCardTitre}>Spécificités personnelles</div>
              <div style={{ fontSize: 12, opacity: 0.45, marginBottom: 14, fontStyle: "italic", lineHeight: 1.5 }}>
                Ces critères permettent d'identifier les festivals avec sections ou prix dédiés. Ils ne sont jamais rendus publics.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "issu·e de la diversité",
                  "jeune créateur·trice (- de 35 ans)",
                  "premier film",
                  "cinéaste femme",
                  "cinéaste LGBTQ+",
                  "film à petit budget",
                ].map(spec => (
                  <button
                    key={spec}
                    style={{
                      ...styles.tag,
                      ...(matchForm.specificites?.includes(spec) ? styles.tagActive : {}),
                      fontSize: 12,
                    }}
                    onClick={() => setMatchForm(f => ({ ...f, specificites: toggle(f.specificites || [], spec) }))}
                  >
                    {spec}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 11, opacity: 0.3, letterSpacing: "0.05em" }}>
                D'autres critères seront ajoutés au fil de l'évolution de la plateforme.
              </div>
            </div>

            {/* Région de prédilection */}
            <div style={styles.profilCard}>
              <div style={styles.profilCardTitre}>Ancrage géographique prioritaire</div>
              <select
                style={{ ...styles.select, marginTop: 4 }}
                value={matchForm.region}
                onChange={e => setMatchForm(f => ({ ...f, region: e.target.value }))}
              >
                <option value="">Tous</option>
                <option value="belgique">Belgique</option>
                <option value="francophonie">Francophonie internationale</option>
              </select>
            </div>

          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button style={styles.matchBtn} onClick={onGoMatcher}>
              Lancer une recherche avec ce profil
            </button>
          </div>
        </div>
      )}

      {activeTab === "proposer" && (
        <div style={styles.profilContent}>
          <div style={styles.proposeIntro}>
            <p style={{ opacity: 0.7, lineHeight: 1.7, fontSize: 14 }}>
              Vous connaissez un festival qui n'est pas encore référencé ? Signalez-le ici. L'équipe ARPi examinera votre suggestion pour l'intégrer au catalogue.
            </p>
          </div>

          <div style={styles.proposeForm}>
            <div style={styles.proposeRow}>
              <div style={styles.proposeField}>
                <label style={styles.proposeLabel}>Nom du festival *</label>
                <input
                  style={styles.proposeInput}
                  placeholder="ex. Festival du Film de Ouagadougou"
                  value={form.nom}
                  onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                />
              </div>
              <div style={styles.proposeField}>
                <label style={styles.proposeLabel}>Site web</label>
                <input
                  style={styles.proposeInput}
                  placeholder="https://..."
                  value={form.site}
                  onChange={e => setForm(f => ({ ...f, site: e.target.value }))}
                />
              </div>
            </div>

            <div style={styles.proposeRow}>
              <div style={styles.proposeField}>
                <label style={styles.proposeLabel}>Ville</label>
                <input
                  style={styles.proposeInput}
                  placeholder="ex. Ouagadougou"
                  value={form.ville}
                  onChange={e => setForm(f => ({ ...f, ville: e.target.value }))}
                />
              </div>
              <div style={styles.proposeField}>
                <label style={styles.proposeLabel}>Pays</label>
                <input
                  style={styles.proposeInput}
                  placeholder="ex. Burkina Faso"
                  value={form.pays}
                  onChange={e => setForm(f => ({ ...f, pays: e.target.value }))}
                />
              </div>
              <div style={styles.proposeField}>
                <label style={styles.proposeLabel}>Deadline (approximative)</label>
                <input
                  style={styles.proposeInput}
                  placeholder="ex. Juin 2026"
                  value={form.deadline}
                  onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                />
              </div>
            </div>

            <div style={styles.proposeField}>
              <label style={styles.proposeLabel}>Formats acceptés (si connus)</label>
              <input
                style={styles.proposeInput}
                placeholder="ex. documentaire, court-métrage, animation..."
                value={form.formats}
                onChange={e => setForm(f => ({ ...f, formats: e.target.value }))}
              />
            </div>

            <div style={styles.proposeField}>
              <label style={styles.proposeLabel}>Notes / contexte</label>
              <textarea
                style={{ ...styles.proposeInput, minHeight: 80, resize: "vertical" }}
                placeholder="Pourquoi ce festival est-il pertinent pour les membres ARPi ?"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
              <button
                style={{ ...styles.matchBtn, opacity: form.nom.trim() ? 1 : 0.4 }}
                onClick={form.nom.trim() ? handleSubmit : undefined}
              >
                Soumettre la suggestion
              </button>
              {submitted && (
                <span style={{ color: "#7B9E87", fontSize: 13 }}>
                  Suggestion enregistrée — merci pour votre contribution.
                </span>
              )}
            </div>
          </div>

          {userFestivals.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <div style={styles.profilCardTitre}>Suggestions soumises ({userFestivals.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {userFestivals.map(f => (
                  <div key={f.id} style={styles.suggestionItem}>
                    <div style={{ fontWeight: 400, fontSize: 15 }}>{f.nom}</div>
                    <div style={{ fontSize: 12, opacity: 0.5, marginTop: 3 }}>
                      {[f.ville, f.pays].filter(Boolean).join(", ")}
                      {f.site && <> — <a href={f.site} target="_blank" rel="noreferrer" style={{ color: "#8B9EC4" }}>{f.site}</a></>}
                    </div>
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


// Inject Barlow Condensed font
if (typeof document !== "undefined") {
  const _s = document.createElement("style");
  _s.textContent = [
    "@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');",
    "html, body { margin: 0; padding: 0; background: #1C2B3A; box-sizing: border-box; }",
    "*, *::before, *::after { box-sizing: border-box; }",
  ].join("\n");
  document.head.appendChild(_s);
}

// ARPi brand tokens
const C = {
  bg:      "#1C2B3A",   // fond bleu-gris foncé ARPi
  bg2:     "#162232",   // fond légèrement plus sombre
  bg3:     "#243647",   // fond cards
  border:  "#2E3F50",
  border2: "#3A5068",
  text:    "#FFFFFF",
  muted:   "rgba(255,255,255,0.55)",
  faint:   "rgba(255,255,255,0.22)",
  orange:  "#E8920A",   // accent ARPi
  orangeD: "#C07808",
  orangeBg:"rgba(232,146,10,0.10)",
};

const styles = {
  root: {
    fontFamily: "'Barlow', sans-serif",
    background: C.bg,
    color: C.text,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
  },
  header: {
    borderBottom: `1px solid ${C.border}`,
    background: C.bg2,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "12px 20px",
    minHeight: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  logo: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: C.orange,
    fontFamily: "'Barlow Condensed', sans-serif",
    textTransform: "uppercase",
  },
  logoSub: {
    fontSize: 11,
    letterSpacing: "0.22em",
    color: C.muted,
    textTransform: "uppercase",
    marginTop: 2,
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  nav: { display: "flex", gap: 4, flexWrap: "wrap" },
  navBtn: {
    background: "transparent",
    border: `1px solid ${C.border}`,
    color: C.text,
    padding: "7px 12px",
    borderRadius: 0,
    cursor: "pointer",
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 500,
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  },
  navBtnActive: {
    background: C.orange,
    borderColor: C.orange,
    color: "#000000",
  },
  main: {
    flex: 1,
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
    padding: "clamp(20px, 5vw, 52px) clamp(16px, 4vw, 32px)",
    boxSizing: "border-box",
  },
  footer: {
    borderTop: `1px solid ${C.border}`,
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: C.muted,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  matcherWrap: { maxWidth: 860, margin: "0 auto" },
  matcherIntro: { marginBottom: 40, borderLeft: `4px solid ${C.orange}`, paddingLeft: 24 },
  h1: {
    fontSize: 42,
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: 14,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  h2: {
    fontSize: 30,
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  intro: { color: C.muted, lineHeight: 1.7, fontSize: 16, fontWeight: 300 },
  pitchBlock: {
    background: C.bg2,
    border: `1px solid ${C.border}`,
    borderLeft: `4px solid ${C.orange}`,
    borderRadius: 0,
    padding: 24,
    marginBottom: 12,
  },
  pitchHeader: { marginBottom: 12 },
  pitchArea: {
    width: "100%",
    background: C.bg,
    border: `1px solid ${C.border}`,
    color: C.text,
    padding: "14px 16px",
    borderRadius: 0,
    fontSize: 14,
    fontFamily: "'Barlow', sans-serif",
    lineHeight: 1.6,
    resize: "vertical",
    boxSizing: "border-box",
    outline: "none",
  },
  pitchActions: { display: "flex", alignItems: "center", gap: 16, marginTop: 12, flexWrap: "wrap" },
  pitchBtn: {
    background: C.orangeBg,
    border: `1px solid ${C.orange}`,
    color: C.orange,
    padding: "10px 24px",
    borderRadius: 0,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 600,
    flexShrink: 0,
  },
  pitchResume: { fontSize: 13, color: C.muted, fontStyle: "italic", flex: 1 },
  pitchError: { fontSize: 12, color: "#FF6B6B", flex: 1 },
  loadingDots: { opacity: 0.7 },
  divider: { display: "flex", alignItems: "center", gap: 16, margin: "28px 0" },
  dividerLabel: {
    fontSize: 12,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: C.faint,
    textAlign: "center",
    padding: "0 16px",
    borderTop: `1px solid ${C.border}`,
    paddingTop: 16,
    width: "100%",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  matcherGrid: { display: "flex", flexDirection: "column", gap: 32 },
  matcherRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 },
  section: {},
  sectionTitle: {
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: C.muted,
    marginBottom: 12,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
  },
  required: { color: C.orange },
  tagCloud: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: {
    background: "transparent",
    border: `1px solid ${C.border}`,
    color: C.text,
    padding: "6px 14px",
    borderRadius: 0,
    cursor: "pointer",
    fontSize: 12,
    transition: "all 0.1s",
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  tagActive: {
    background: C.orange,
    borderColor: C.orange,
    color: "#000000",
  },
  select: {
    background: C.bg2,
    border: `1px solid ${C.border}`,
    color: C.text,
    padding: "10px 14px",
    borderRadius: 0,
    width: "100%",
    fontSize: 13,
    fontFamily: "'Barlow', sans-serif",
    cursor: "pointer",
  },
  matchBtn: {
    background: C.orange,
    color: "#000000",
    border: "none",
    padding: "16px 48px",
    fontSize: 13,
    letterSpacing: "0.15em",
    fontFamily: "'Barlow Condensed', sans-serif",
    textTransform: "uppercase",
    borderRadius: 0,
    cursor: "pointer",
    fontWeight: 700,
    transition: "all 0.15s",
  },
  resultsWrap: {},
  resultsHeader: { display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 32 },
  backBtn: {
    background: "transparent",
    border: `1px solid ${C.border}`,
    color: C.text,
    padding: "8px 16px",
    borderRadius: 0,
    cursor: "pointer",
    fontSize: 11,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    marginTop: 4,
  },
  resultsList: { display: "flex", flexDirection: "column", gap: 12 },
  resultCard: {
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderRadius: 0,
    padding: "24px",
    display: "flex",
    gap: 20,
    cursor: "pointer",
    transition: "border-color 0.15s",
    borderLeft: `3px solid transparent`,
  },
  resultRank: {
    fontSize: 32,
    fontWeight: 700,
    color: C.orange,
    opacity: 0.35,
    width: 44,
    flexShrink: 0,
    textAlign: "right",
    paddingTop: 2,
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  resultTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  resultName: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 4,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.03em",
  },
  resultMeta: { fontSize: 12, color: C.muted, letterSpacing: "0.04em" },
  scoreCircle: {
    width: 44,
    height: 44,
    borderRadius: 0,
    background: C.bg2,
    border: `2px solid ${C.orange}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 700,
    color: C.orange,
    flexShrink: 0,
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  matchBar: { height: 2, background: C.border, borderRadius: 0, marginBottom: 12 },
  matchBarFill: { height: "100%", background: `linear-gradient(90deg, ${C.orange}, #F5B942)`, borderRadius: 0, transition: "width 0.5s" },
  reasons: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 },
  reasonTag: {
    background: C.orangeBg,
    border: `1px solid rgba(232,146,10,0.3)`,
    color: C.orange,
    padding: "3px 10px",
    borderRadius: 0,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 500,
  },
  resultFooter: { display: "flex", alignItems: "center", gap: 16, fontSize: 12 },
  deadlineLabel: { color: C.muted },
  feesLabel: { color: C.faint, fontSize: 11 },
  ficheBtn: {
    marginLeft: "auto",
    background: "transparent",
    border: `1px solid ${C.orange}`,
    color: C.orange,
    padding: "6px 14px",
    borderRadius: 0,
    cursor: "pointer",
    fontSize: 11,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  prestigeBadge: {
    padding: "3px 10px",
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#000000",
    fontFamily: "'Barlow Condensed', sans-serif",
    textTransform: "uppercase",
  },
  catalogueWrap: {},
  catalogueHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 },
  catalogueFilters: { display: "flex", gap: 8 },
  catalogueGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 },
  catCard: {
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderRadius: 0,
    borderTop: `3px solid transparent`,
    padding: 20,
    cursor: "pointer",
    transition: "border-color 0.15s",
  },
  catCardTop: { display: "flex", gap: 8, marginBottom: 12 },
  catName: {
    fontSize: 15,
    marginBottom: 4,
    lineHeight: 1.3,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  catMeta: { fontSize: 12, color: C.muted, marginBottom: 2 },
  catEdition: { fontSize: 12, color: C.orange, marginBottom: 10, fontFamily: "'Barlow Condensed', sans-serif" },
  catFormats: { display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 },
  fmtTag: {
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${C.border}`,
    color: C.muted,
    padding: "2px 8px",
    borderRadius: 0,
    fontSize: 12,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  catDeadline: { fontSize: 11, color: C.faint, letterSpacing: "0.04em" },
  regionTag: {
    background: "transparent",
    border: `1px solid ${C.border2}`,
    padding: "3px 8px",
    borderRadius: 0,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: C.muted,
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  ccaBadge: {
    background: "#1A4A2E",
    color: "#7FBF9A",
    border: "1px solid #2A6A42",
    padding: "3px 7px",
    borderRadius: 0,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  ccaBadgeLg: {
    background: "#1A4A2E",
    color: "#7FBF9A",
    border: "1px solid #2A6A42",
    padding: "4px 10px",
    borderRadius: 0,
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  ccaFilterBtn: {
    background: "transparent",
    border: `1px solid ${C.border2}`,
    color: C.muted,
    padding: "8px 14px",
    borderRadius: 0,
    fontSize: 12,
    letterSpacing: "0.04em",
    cursor: "pointer",
    fontFamily: "'Barlow Condensed', sans-serif",
    textTransform: "uppercase",
    transition: "all 0.15s",
  },
  ccaFilterBtnActive: {
    background: "#1A4A2E",
    color: "#7FBF9A",
    border: "1px solid #2A6A42",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    color: C.text,
    cursor: "pointer",
    userSelect: "none",
  },
  checkInput: {
    width: 15,
    height: 15,
    accentColor: C.orange,
    cursor: "pointer",
    flexShrink: 0,
  },
  ficheWrap: { maxWidth: 960, margin: "0 auto" },
  ficheHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 40,
    marginTop: 16,
    paddingBottom: 32,
    borderBottom: `1px solid ${C.border}`,
    flexWrap: "wrap",
    gap: 16,
  },
  fichePrestige: { display: "flex", gap: 8, marginBottom: 12 },
  ficheTitre: {
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: "0.03em",
    marginBottom: 8,
    lineHeight: 1.15,
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  ficheMeta: { color: C.muted, fontSize: 14 },
  siteBtn: {
    background: "transparent",
    border: `1px solid ${C.orange}`,
    color: C.orange,
    padding: "10px 20px",
    borderRadius: 0,
    textDecoration: "none",
    fontSize: 11,
    whiteSpace: "nowrap",
    flexShrink: 0,
    marginTop: 8,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  ficheBody: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 },
  ficheCol: {},
  ficheBlockTitre: {
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.faint,
    marginBottom: 10,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
  },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  fmtTagLg: {
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${C.border}`,
    color: C.muted,
    padding: "5px 12px",
    borderRadius: 0,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  genreTag: {
    background: "rgba(232,146,10,0.08)",
    border: `1px solid rgba(232,146,10,0.3)`,
    color: C.orange,
    padding: "5px 12px",
    borderRadius: 0,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  themeTag: {
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${C.border2}`,
    color: C.text,
    padding: "5px 12px",
    borderRadius: 0,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  ficheSide: {},
  ficheSideCard: {
    background: C.bg2,
    border: `1px solid ${C.border}`,
    borderTop: `3px solid ${C.orange}`,
    borderRadius: 0,
    padding: 24,
    position: "sticky",
    top: 80,
  },
  ficheStat: { marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${C.border}` },
  ficheStatLabel: {
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.faint,
    marginBottom: 6,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
  },
  ficheStatValue: { fontSize: 14 },

  // Profil
  profilWrap: { maxWidth: 900, margin: "0 auto" },
  profilHeader: { marginBottom: 32, borderLeft: `4px solid ${C.orange}`, paddingLeft: 24 },
  profilTabs: { display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 36 },
  profilTab: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    color: C.text,
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 600,
    opacity: 0.45,
    marginBottom: -1,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  profilTabActive: {
    opacity: 1,
    borderBottom: `2px solid ${C.orange}`,
    color: C.orange,
  },
  profilBadge: {
    background: C.orange,
    color: "#000000",
    borderRadius: 0,
    padding: "1px 7px",
    fontSize: 12,
    fontWeight: 700,
  },
  profilContent: {},
  profilGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 },
  profilCard: {
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderRadius: 0,
    padding: 24,
  },
  profilCardTitre: {
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.faint,
    marginBottom: 16,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
  },
  radioRow: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 14,
    padding: "4px 0",
  },
  proposeIntro: { marginBottom: 28 },
  proposeForm: { display: "flex", flexDirection: "column", gap: 16 },
  proposeRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  proposeField: { display: "flex", flexDirection: "column", gap: 6, flex: 1 },
  proposeLabel: {
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: C.faint,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
  },
  proposeInput: {
    background: C.bg2,
    border: `1px solid ${C.border}`,
    color: C.text,
    padding: "10px 14px",
    borderRadius: 0,
    fontSize: 13,
    fontFamily: "'Barlow', sans-serif",
    outline: "none",
  },
  suggestionItem: {
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderLeft: `3px solid ${C.orange}`,
    borderRadius: 0,
    padding: "16px 20px",
  },

  // Soumission
  ficheSoumission: {
    paddingTop: 20,
    borderTop: `1px solid ${C.border}`,
    marginTop: 4,
  },
  soumissionPlateforme: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 6,
    color: C.orange,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  soumissionNote: { fontSize: 12, color: C.muted, lineHeight: 1.5, marginBottom: 12 },
  soumissionBtn: {
    display: "inline-block",
    background: "transparent",
    border: `1px solid ${C.orange}`,
    color: C.orange,
    padding: "8px 16px",
    borderRadius: 0,
    textDecoration: "none",
    fontSize: 11,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  soumissionPill: {
    background: C.orangeBg,
    border: `1px solid rgba(232,146,10,0.35)`,
    color: C.orange,
    padding: "3px 10px",
    borderRadius: 0,
    fontSize: 12,
    textDecoration: "none",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
  },

  // Outils
  outilsWrap: { maxWidth: 1000, margin: "0 auto" },
  outilsIntro: { marginBottom: 36, borderLeft: `4px solid ${C.orange}`, paddingLeft: 24 },
  outilsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginBottom: 32 },
  outilCard: {
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderTop: "3px solid transparent",
    borderRadius: 0,
    padding: "18px 20px",
    cursor: "pointer",
    transition: "border-color 0.15s, background 0.15s",
  },
  outilCardActive: { background: C.bg2, borderColor: C.border2 },
  outilCardTop: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  outilLogo: {
    width: 40, height: 40, borderRadius: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, color: "#000",
    letterSpacing: "0.05em", flexShrink: 0,
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  outilNom: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 2,
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.03em",
  },
  outilType: {
    fontSize: 12,
    color: C.faint,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  ethiqueBadge: {
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${C.border2}`,
    color: C.muted,
    padding: "2px 8px",
    borderRadius: 0,
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    fontFamily: "'Barlow Condensed', sans-serif",
  },
  outilFormats: { display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 },
  outilTarif: { fontSize: 11, color: C.faint, lineHeight: 1.4 },
  outilDetail: {
    background: C.bg2,
    border: `1px solid ${C.border}`,
    borderTop: `3px solid ${C.orange}`,
    borderRadius: 0,
    padding: 28,
    marginBottom: 28,
  },
  outilDetailHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${C.border}` },
  outilDetailGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 },
  outilsNote: {
    fontSize: 11,
    color: C.faint,
    lineHeight: 1.6,
    borderTop: `1px solid ${C.border}`,
    paddingTop: 20,
    fontStyle: "italic",
  },
};
