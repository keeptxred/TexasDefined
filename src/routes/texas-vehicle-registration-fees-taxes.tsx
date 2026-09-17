import { createFileRoute } from '@tanstack/react-router';

const canonicalPath = '/texas-vehicle-registration-fees-taxes';
const title = 'Texas Vehicle Registration Fees, Taxes & EV Charges';
const description = 'Texas vehicle registration fees, title charges, EV fees, sales and use tax, new-resident tax, gift tax and standard presumptive value explained.';
const pageHead = {
  meta: [
    { title: title },
    { name: 'description', content: description },
  ],
  links: [{ rel: 'canonical', href: `https://texasdefined.com${canonicalPath}` }],
};

export const Route = createFileRoute('/texas-vehicle-registration-fees-taxes')({
  head: () => pageHead,
});
