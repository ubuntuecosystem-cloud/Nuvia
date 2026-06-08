-- =========================================
-- NUVIA INITIAL GRAPH SCHEMA MIGRATION
-- Generated from verified live Supabase schema
-- =========================================

-- CONTEXTS
CREATE TABLE IF NOT EXISTS contexts (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    scope_rules jsonb,
    created_at timestamp without time zone
);

-- ENTITIES
CREATE TABLE IF NOT EXISTS entities (
    id uuid PRIMARY KEY,
    type text NOT NULL,
    metadata jsonb,
    created_at timestamp without time zone
);

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
    id uuid PRIMARY KEY,
    actor_id uuid,
    action_type text NOT NULL,
    payload jsonb,
    created_at timestamp without time zone
);

-- RELATIONSHIPS
CREATE TABLE IF NOT EXISTS relationships (
    id uuid PRIMARY KEY,
    from_entity uuid NOT NULL,
    to_entity uuid NOT NULL,
    type text NOT NULL,
    context_id uuid,
    metadata jsonb,
    created_at timestamp without time zone
);
