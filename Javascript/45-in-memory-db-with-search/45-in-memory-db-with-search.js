// Implement an In-Memory DB with Search
// InMemorySearch class:
//   addDocuments(namespace, ...docs) — add docs to a namespace (creates if absent)
//   search(namespace, filterFn, orderBy?) — filter docs; orderBy = { key, asc }
//   registerNameSpace(name) — explicitly pre-register an empty namespace

class InMemorySearch {
  // TODO
}

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const movies = [
  { name: 'Avenger',       rating: 8.5, year: 2017 },
  { name: 'Black Adam',    rating: 8.7, year: 2022 },
  { name: 'John Wick 4',   rating: 8.2, year: 2023 },
  { name: 'Black Panther', rating: 9.0, year: 2022 },
];

const db = new InMemorySearch();
db.addDocuments('Movies', ...movies);

// TC1 — filter only, no orderBy
test(
  'TC1: filter without orderBy',
  db.search('Movies', (e) => e.year === 2022),
  [
    { name: 'Black Adam',    rating: 8.7, year: 2022 },
    { name: 'Black Panther', rating: 9.0, year: 2022 },
  ]
);

// TC2 — filter + orderBy descending
test(
  'TC2: filter + orderBy rating desc',
  db.search('Movies', (e) => e.rating > 8.5, { key: 'rating', asc: false }),
  [
    { name: 'Black Panther', rating: 9.0, year: 2022 },
    { name: 'Black Adam',    rating: 8.7, year: 2022 },
  ]
);

// TC3 — filter + orderBy ascending
test(
  'TC3: filter + orderBy year asc',
  db.search('Movies', (e) => e.rating > 8.5, { key: 'year', asc: true }),
  [
    { name: 'Black Adam',    rating: 8.7, year: 2022 },
    { name: 'Black Panther', rating: 9.0, year: 2022 },
  ]
);

// TC4 — no matches returns empty array
test(
  'TC4: filter with no matches returns []',
  db.search('Movies', (e) => e.rating > 10),
  []
);

// TC5 — addDocuments to an existing namespace merges
db.addDocuments('Movies', { name: 'Dune 2', rating: 8.8, year: 2024 });
test(
  'TC5: addDocuments merges into existing namespace',
  db.search('Movies', (e) => e.year === 2024),
  [{ name: 'Dune 2', rating: 8.8, year: 2024 }]
);

// TC6 — multiple independent namespaces
const db2 = new InMemorySearch();
db2.addDocuments('Books', { title: 'JS: The Good Parts', pages: 176 });
db2.addDocuments('Movies', { name: 'Inception', rating: 8.8, year: 2010 });
test(
  'TC6: namespaces are independent',
  db2.search('Books', () => true),
  [{ title: 'JS: The Good Parts', pages: 176 }]
);

// TC7 — registerNameSpace then addDocuments
const db3 = new InMemorySearch();
db3.registerNameSpace('Songs');
db3.addDocuments('Songs', { title: 'Blinding Lights' });
test(
  'TC7: registerNameSpace + addDocuments works',
  db3.search('Songs', () => true),
  [{ title: 'Blinding Lights' }]
);

// TC8 — search on missing namespace returns empty array (or undefined)
const db4 = new InMemorySearch();
const result = db4.search('Missing', () => true);
test('TC8: search on missing namespace returns [] or undefined', !result || result.length === 0, true);

console.log('\nAll tests done');
