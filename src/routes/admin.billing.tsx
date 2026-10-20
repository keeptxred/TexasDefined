import {createFileRoute} from '@tanstack/react-router';

export const Route=createFileRoute('/admin/billing')({
  head:()=>({meta:[
    {title:'Billing | TexasDefined Admin'},
    {name:'robots',content:'noindex,nofollow,noarchive'},
  ]}),
});
