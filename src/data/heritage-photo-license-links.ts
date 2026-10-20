/**
 * Verified per-image provenance for specific TexasDefined editorial pages.
 * Originally covering the Fredericksburg–Johnson City corridor, now also museum photos.
 * Only exact Commons files independently matched to the published hero are listed.
 * Additional images must not be assumed to share these rights or source files.
 */
type HeritagePhotoRights = { sourceUrl: string; licenseUrl: string };

const rightsByPath: Record<string, HeritagePhotoRights> = {
  "/article/moving-to-texas-renter-guide": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:GulftonApartmentComplexes.JPG",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  "/article/best-houston-suburbs-for-commuters": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2025-09-14_16_24_08_View_north_along_Texas_State_Highway_99_(Grand_Parkway)_just_north_of_its_western_interchange_with_Interstate_10_(Katy_Freeway)_in_Houston,_Harris_County,_Texas.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/article/best-dallas-suburbs-for-commuters": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A_DART_(Dallas_Area_Rapid_Transit)_light-rail_train_leaves_the_Akard_Station_in_downtown_Dallas,_Texas.jpg",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  "/article/texas-property-taxes-for-new-residents": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Webb_County,_TX,_Appraisal_District_Office_IMG_2011.JPG",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  "/article/corporate-relocation-to-texas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:OneCongressPlazaAustinTX.JPG",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  "/article/employee-relocation-guide-to-texas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Desk-office-workspace-coworking_(23699033283).jpg",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  "/article/renting-vs-buying-in-texas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Wilson_House,_Houston,_TX.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/article/how-to-verify-texas-moving-company": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mayflower_Moving_Truck_Ypsilanti_Michigan.JPG",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
  },
  "/article/health-insurance-when-moving-to-texas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Doctor_consults_with_patient.jpg",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  "/article/military-family-moving-to-texas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:BOSP_helps_single-parent_soldiers_manage_Army_and_family_life_120908-A-XZ708-003.jpg",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  "/destination/magoffin-home": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Magoffin_home_2009.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "/destination/hotel-paso-del-norte": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tiffany_glass_dome,_Camino_Real_Hotel_(formerly_Hotel_Paso_del_Norte),_1912_.JPG",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  "/destination/booker-t-washington-high-school-dallas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Booker_T._Washington_High_School_for_the_Performing_and_Visual_Arts_01.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  "/destination/freedmans-cemetery-memorial-dallas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:African_American_Museum_August_2016_10_(Facing_the_Rising_Sun_Freedman%27s_Cemetery_exhibit).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/destination/juanita-craft-civil-rights-house-dallas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:P1520669-1.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  "/destination/st-paul-united-methodist-church-dallas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dallas_-_St._Paul_United_Methodist_Church_01A.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  "/destination/queen-city-heights-historic-district-dallas": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:MASS_Building.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  "/destination/tenth-street-historic-district-oak-cliff": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_(29573143580).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "/destination/alvin-historical-museum": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Former_alvin_tx_post_office.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "/destination/museum-of-the-american-railroad-frisco": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Frisco_June_2019_28_(Museum_of_the_American_Railroad).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/article/fredericksburg-johnson-city-historic-road-trip": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lyndon_B._Johnson_Ranch_October_2020_28_(Texas_White_House).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/destination/fredericksburg-art-guild": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fredericksburg_July_2017_5_(Marktplatz).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/destination/luckenbach": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Luckenbach_Dance_Hall_(48523152961).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  "/destination/stonewall": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Texas_longhorn.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "/destination/fort-martin-scott": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_martin_scott_2008.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "/destination/lyndon-b-johnson-state-park-historic-site": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Texas_longhorn.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "/destination/lyndon-b-johnson-national-historical-park": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Views_at_Lyndon_B._Johnson_National_Historical_Park,_Texas_(5a734466-55b3-4ceb-a58d-c90a5d01536c).jpg",
    licenseUrl: "https://www.nps.gov/lyjo/learn/photosmultimedia/index.htm",
  },
};

export function heritagePhotoRightsForPath(path: string): HeritagePhotoRights | null {
  return rightsByPath[path] ?? null;
}
