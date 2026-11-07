// ANALISISBETCHILE - Conexion de datos deportivos

(function () {
  const BASE_URL = "https://sportscore.com/api/widget";

  const SPORTS = ["football", "basketball", "tennis"];

  async function getMatches(sport, limit = 50) {
    if (!SPORTS.includes(sport)) {
      throw new Error("Deporte no disponible");
    }

    const url =
      `${BASE_URL}/matches/?sport=${sport}&limit=${limit}&src=Analisisbetchile`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("No se pudieron cargar los partidos");
    }

    const data = await response.json();

    return data.matches || [];
  }

  async function getAllMatches() {
    const results = await Promise.allSettled(
      SPORTS.map(sport => getMatches(sport))
    );

    return {
      football: results[0].status === "fulfilled" ? results[0].value : [],
      basketball: results[1].status === "fulfilled" ? results[1].value : [],
      tennis: results[2].status === "fulfilled" ? results[2].value : []
    };
  }

  window.AnalisisbetAPI = {
    getMatches,
    getAllMatches
  };
})();

