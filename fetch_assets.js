async function searchClosedEye() {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=closed%20eye%20macro%20eyelid&srnamespace=6&srlimit=20&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  console.log('Search results for closed eye macro:', data.query.search.map(s => s.title));
}
searchClosedEye();
