export const ontologyRegistry = {

  entities: [

    "person",

    "identity",

    "relationship",

    "community",

    "contribution",

    "knowledge",

    "event",

  ] as const,

};

export type OntologyEntity =

  typeof ontologyRegistry.entities[number];
