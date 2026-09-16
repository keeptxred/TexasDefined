import { createFileRoute } from '@tanstack/react-router';
export const Route=createFileRoute('/relocation-tools-indexing')({beforeLoad:()=>{throw new Response(null,{status:404})}});
