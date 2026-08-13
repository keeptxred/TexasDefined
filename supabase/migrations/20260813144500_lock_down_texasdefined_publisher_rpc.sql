-- Supabase may grant exposed functions to API roles through project defaults.
-- Make the article publication RPC explicitly service-role-only.
REVOKE ALL ON FUNCTION public.publish_texasdefined_queue_item_v2(bigint,text,text,text,text,text,text,text,text,text,text[],jsonb,text[],text[],text,integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.publish_texasdefined_queue_item_v2(bigint,text,text,text,text,text,text,text,text,text,text[],jsonb,text[],text[],text[],text,integer) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.publish_texasdefined_queue_item_v2(bigint,text,text,text,text,text,text,text,text,text,text[],jsonb,text[],text[],text,integer) TO service_role;
