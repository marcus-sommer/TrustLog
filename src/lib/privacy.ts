import type { Locale } from "./locale";
import { SITE } from "./site";

export type PrivacyBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
};

export type PrivacyDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacyBlock[];
};

const da: PrivacyDoc = {
  title: "Privatlivspolitik",
  updated: `Sidst opdateret ${SITE.privacyUpdatedDa}`,
  intro:
    "Oplysningspligten i GDPR betyder, at vi skal fortælle, hvordan TrustLog behandler personoplysninger. Politikken er udarbejdet med udgangspunkt i skabelonen fra GDPR.DK og tilpasset den behandling, TrustLog faktisk foretager.",
  sections: [
    {
      heading: "Dataansvarlig",
      paragraphs: [
        "Vi er dataansvarlig for behandlingen af de personoplysninger, som vi behandler om besøgende, brugere og samarbejdspartnere. Du finder vores kontaktoplysninger nedenfor.",
        `${SITE.product} drives af ${SITE.controller}.`,
        SITE.region,
        "TrustLog er i øjeblikket et selvstændigt projekt uden CVR-nummer. Når der oprettes en virksomhed, opdateres denne politik med CVR-nummer og postadresse.",
        `Har du spørgsmål til behandlingen af dine personoplysninger, kan du kontakte os på ${SITE.email}.`,
      ],
    },
    {
      heading: "Behandlingsaktiviteter",
      paragraphs: [
        "Som dataansvarlig efter GDPR har vi følgende behandlingsaktiviteter.",
      ],
      subsections: [
        {
          heading: "Besøg på hjemmeside",
          paragraphs: [
            "Når du besøger vores hjemmeside, kan der automatisk opstå almindelige serverlogfiler hos den udbyder, der hoster siden — typisk IP-adresse, tidspunkt, browser og den side, du har bedt om. Formålet er at levere og sikre hjemmesiden.",
            "Vi anvender ikke cookies til statistik, markedsføring eller sporing. For at TrustLog kan virke, gemmer vi strengt nødvendige oplysninger lokalt i din browser (localStorage): din kladde til fortegnelsen, dit sprogvalg og det navn, du eventuelt angiver som redaktør. Det er ikke en cookie-banner-situation — uden den lagring kan vi ikke huske jeres arbejde mellem besøg.",
            "Hjemlen er databeskyttelsesforordningens artikel 6, stk. 1, litra f (legitim interesse i at drive og sikre tjenesten) og, for den lokale kladde, artikel 6, stk. 1, litra b, når du selv beder om at bruge værktøjet.",
            "Serverlogfiler opbevares kun så længe, det er nødvendigt af drift- og sikkerhedshensyn. Den lokale kladde ligger i din browser, indtil du sletter den, starter forfra eller rydder webbrowserens lager.",
          ],
        },
        {
          heading: "Brug af TrustLog",
          paragraphs: [
            "TrustLog er et interviewværktøj, der hjælper jer med at udarbejde en fortegnelse over behandlingsaktiviteter efter GDPR artikel 30. I indtaster oplysninger om virksomheden, systemer, formål og sikkerhedsforanstaltninger.",
            "Som udgangspunkt gemmes kladden kun i din egen browser. Vi modtager den ikke, og vi er ikke dataansvarlig for indholdet af jeres fortegnelse, så længe det bliver på jeres enhed. Den officielle kopi er den PDF, I downloader og lægger i jeres eget arkiv.",
            "Hvis I deler et arbejdsområde via et link, sender I kladden til den server, TrustLog kører på, så en kollega kan åbne den. Her opbevarer vi den JSON-fil, I har valgt at dele, indtil den ikke længere er nødvendig, eller indtil I beder os slette den.",
            "Kladden kan indeholde personoplysninger, I selv skriver ind — fx kontaktperson, DPO-navn eller medarbejderkategorier. I må ikke indtaste unødvendige oplysninger om enkeltpersoner. For indholdet af en delt fortegnelse er I som udgangspunkt dataansvarlig; TrustLog behandler filen på jeres foranledning som databehandler, så I kan samarbejde om udkastet.",
            "Hjemlen til at drive selve tjenesten (arbejdsområde-id, tidspunkt for deling og den fil, I uploader) er artikel 6, stk. 1, litra b og f.",
          ],
        },
        {
          heading: "Kommunikation med potentielle brugere",
          paragraphs: [
            "Når du har spørgsmål til siden eller vil høre mere, kan du kontakte os på e-mail. Vi har ikke en kontaktformular eller et telefonnummer på siden i øjeblikket.",
            "Herigennem behandler vi de oplysninger, du selv giver os — typisk navn, e-mail og indholdet af din henvendelse — så vi kan svare.",
            "Hjemlen er databeskyttelsesforordningens artikel 6, stk. 1, litra f.",
            "Vi sletter kommunikationen, når det står klart, om der er brug for videre dialog, og senest når formålet er opfyldt. I særlige tilfælde kan opbevaring ske længere, hvis det er nødvendigt for at dokumentere dialogen.",
          ],
        },
        {
          heading: "Kunder",
          paragraphs: [
            "TrustLog er endnu ikke en abonnementsydelse med kunde-login. Hvis du senere bliver kunde, kan vi behandle navn, adresse, ydelse og betalingsoplysninger for at levere og administrere aftalen.",
            "Hjemlen vil være databeskyttelsesforordningens artikel 6, stk. 1, litra b.",
            "Når ydelsen er leveret, og eventuelle udeståender er afsluttet, sletter vi oplysningerne, medmindre vi er forpligtet til at gemme dem længere — se afsnittet om bogføring.",
          ],
        },
        {
          heading: "Nyhedsbrev",
          paragraphs: [
            "Vi har ikke et nyhedsbrev. Vi sender ikke e-mails med markedsføring, og vi indsamler ikke samtykke til nyhedsbreve.",
            "Hvis det ændrer sig, vil tilmelding ske med aktivt samtykke (artikel 6, stk. 1, litra a), og denne politik vil blive opdateret.",
          ],
        },
        {
          heading: "Bogføring",
          paragraphs: [
            "Hvis TrustLog udsteder fakturaer eller bogfører bilag, skal vi gemme dem efter bogføringsloven. Heraf kan fremgå almindelige personoplysninger som navn, adresse og ydelsesbeskrivelse.",
            "Hjemlen er databeskyttelsesforordningens artikel 6, stk. 1, litra c, sammenholdt med bogføringsloven.",
            "Vi opbevarer disse oplysninger i minimum 5 år efter, at indeværende regnskabsår er afsluttet.",
          ],
        },
        {
          heading: "Jobansøgninger",
          paragraphs: [
            "Vi har ikke et rekrutteringssystem. Hvis du alligevel sender en uopfordret ansøgning, er hjemlen artikel 6, stk. 1, litra f. Vi vurderer, om den er relevant, og sletter den, hvis der ikke er et match.",
            "Bliver du inddraget i et rekrutteringsforløb eller ansat, får du særskilt information om behandlingen.",
          ],
        },
      ],
    },
    {
      heading: "Databehandlere",
      paragraphs: [
        "Få kan klare alt selv, og det samme gælder os. Vi kan derfor bruge leverandører, hvoraf nogle er databehandlere — for eksempel til hosting af hjemmesiden, e-mail eller drift.",
        "Hvis hjemmesiden hostes hos en ekstern udbyder, behandler denne serverlogfiler og eventuelle delte arbejdsområder på vores vegne.",
        "Det er vores ansvar at sikre, at dine personoplysninger behandles ordentligt. Vi stiller krav til samarbejdspartnere og indgår databehandleraftaler, når en leverandør håndterer personoplysninger for os.",
      ],
    },
    {
      heading: "Videregivelse af personoplysninger",
      paragraphs: [
        "Vi videregiver ikke dine personoplysninger til tredjemand, medmindre vi er forpligtet til det efter loven, eller du selv beder os om det (for eksempel ved at dele et arbejdsområde med en kollega).",
      ],
    },
    {
      heading: "Profilering og automatiserede afgørelser",
      paragraphs: [
        "Vi foretager ikke profilering eller automatiserede afgørelser.",
      ],
    },
    {
      heading: "Tredjelandeoverførsler",
      paragraphs: [
        "Vi benytter som udgangspunkt databehandlere i EU/EØS, eller som opbevarer data i EU/EØS.",
        "I nogle tilfælde er dette ikke muligt, og her kan der benyttes databehandlere uden for EU/EØS, hvis de kan give dine personoplysninger en passende beskyttelse — for eksempel via EU-Kommissionens standardkontraktbestemmelser eller en gyldig overførselsordning.",
      ],
    },
    {
      heading: "Behandlingssikkerhed",
      paragraphs: [
        "Vi holder behandlingen af personoplysninger sikker ved at have indført passende tekniske og organisatoriske foranstaltninger.",
        "Vi har vurderet risikoen ved behandlingen og indrettet os derefter: kladden ligger som udgangspunkt kun hos jer, deling er frivillig, og den færdige fortegnelse downloades til jeres eget arkiv.",
        "En vigtig foranstaltning er minimering: TrustLog er bygget, så I kan beskrive kategorier og formål uden at indtaste unødvendige oplysninger om enkeltpersoner.",
      ],
    },
    {
      heading: "De registreredes rettigheder",
      paragraphs: [
        "Du har efter databeskyttelsesforordningen en række rettigheder i forhold til vores behandling af oplysninger om dig. Hvis du vil gøre brug af dine rettigheder, skal du kontakte os, så vi kan hjælpe dig.",
      ],
      subsections: [
        {
          heading: "Ret til at se oplysninger (indsigtsret)",
          paragraphs: [
            "Du har ret til at få indsigt i de oplysninger, som vi behandler om dig, samt en række yderligere oplysninger.",
          ],
        },
        {
          heading: "Ret til berigtigelse (rettelse)",
          paragraphs: ["Du har ret til at få urigtige oplysninger om dig selv rettet."],
        },
        {
          heading: "Ret til sletning",
          paragraphs: [
            "I særlige tilfælde har du ret til at få slettet oplysninger om dig, inden tidspunktet for vores almindelige sletning indtræffer. Du kan altid slette den lokale kladde i browseren ved at starte forfra eller rydde webbrowserens lager.",
          ],
        },
        {
          heading: "Ret til begrænsning af behandling",
          paragraphs: [
            "Du har i visse tilfælde ret til at få behandlingen af dine personoplysninger begrænset. Hvis du har ret til det, må vi fremover kun behandle oplysningerne — bortset fra opbevaring — med dit samtykke, eller med henblik på at retskrav kan fastlægges, gøres gældende eller forsvares, eller for at beskytte en person eller vigtige samfundsinteresser.",
          ],
        },
        {
          heading: "Ret til indsigelse",
          paragraphs: [
            "Du har i visse tilfælde ret til at gøre indsigelse mod vores ellers lovlige behandling af dine personoplysninger. Du kan også gøre indsigelse mod behandling af dine oplysninger til direkte markedsføring.",
          ],
        },
        {
          heading: "Ret til at transmittere oplysninger (dataportabilitet)",
          paragraphs: [
            "Du har i visse tilfælde ret til at modtage dine personoplysninger i et struktureret, almindeligt anvendt og maskinlæsbart format samt at få overført disse personoplysninger fra én dataansvarlig til en anden uden hindring. I TrustLog kan I allerede eksportere jeres fortegnelse som PDF og Markdown.",
          ],
        },
      ],
    },
    {
      heading: "Mere om dine rettigheder",
      paragraphs: [
        "Du kan læse mere om dine rettigheder i Datatilsynets vejledning om de registreredes rettigheder på www.datatilsynet.dk.",
      ],
    },
    {
      heading: "Tilbagetrækning af samtykke",
      paragraphs: [
        "Når vores behandling af dine personoplysninger er baseret på dit samtykke, har du ret til at trække dit samtykke tilbage. Tilbagetrækning påvirker ikke lovligheden af behandlingen, før samtykket blev trukket tilbage. Vi indhenter i øjeblikket ikke samtykke til nyhedsbreve eller cookies.",
      ],
    },
    {
      heading: "Klage til Datatilsynet",
      paragraphs: [
        "Du har ret til at indgive en klage til Datatilsynet, hvis du er utilfreds med den måde, vi behandler dine personoplysninger på. Du finder Datatilsynets kontaktoplysninger på www.datatilsynet.dk.",
        "Vi vil generelt opfordre dig til at læse mere om GDPR, så du er opdateret på reglerne.",
      ],
    },
  ],
};

const en: PrivacyDoc = {
  title: "Privacy policy",
  updated: `Last updated ${SITE.privacyUpdatedEn}`,
  intro:
    "GDPR’s information duty means we must explain how TrustLog processes personal data. This policy is based on the GDPR.DK template and adapted to the processing TrustLog actually carries out.",
  sections: [
    {
      heading: "Data controller",
      paragraphs: [
        "We are the controller for the personal data we process about visitors, users and partners. Our contact details are below.",
        `${SITE.product} is run by ${SITE.controller}.`,
        SITE.region,
        "TrustLog is currently an independent project without a CVR number. When a company is registered, this policy will be updated with the CVR number and postal address.",
        `If you have questions about the processing of your personal data, you can contact us at ${SITE.email}.`,
      ],
    },
    {
      heading: "Processing activities",
      paragraphs: ["As controller under the GDPR, we have the following processing activities."],
      subsections: [
        {
          heading: "Visits to the website",
          paragraphs: [
            "When you visit our website, ordinary server logs may be created by the host — typically IP address, time, browser and the page requested. The purpose is to deliver and secure the site.",
            "We do not use cookies for analytics, marketing or tracking. For TrustLog to work, we store strictly necessary data locally in your browser (localStorage): your draft record, your language choice, and any editor name you enter. This is not a cookie-banner case — without that storage we cannot remember your work between visits.",
            "The legal basis is Article 6(1)(f) (legitimate interest in running and securing the service) and, for the local draft, Article 6(1)(b) when you ask to use the tool.",
            "Server logs are kept only as long as needed for operations and security. The local draft stays in your browser until you delete it, start over, or clear site storage.",
          ],
        },
        {
          heading: "Using TrustLog",
          paragraphs: [
            "TrustLog is an interview tool that helps you draft a record of processing activities under GDPR Article 30. You enter information about the organisation, systems, purposes and security measures.",
            "By default the draft is stored only in your browser. We do not receive it, and we are not the controller of your record’s contents while it remains on your device. The official copy is the PDF you download and keep in your own archive.",
            "If you share a workspace via a link, you send the draft to the server TrustLog runs on so a colleague can open it. We then store the JSON file you chose to share until it is no longer needed, or until you ask us to delete it.",
            "The draft may contain personal data you type in — for example a contact person, DPO name or staff categories. Do not enter unnecessary data about individuals. For the contents of a shared record you are typically the controller; TrustLog stores the file on your instruction as a processor so you can collaborate on the draft.",
            "The legal basis for operating the service itself (workspace id, share time and the file you upload) is Article 6(1)(b) and (f).",
          ],
        },
        {
          heading: "Communication with potential users",
          paragraphs: [
            "If you have questions about the site or want to hear more, you can contact us by email. We do not currently have a contact form or phone number on the site.",
            "We process the information you give us — typically name, email and the content of your message — so we can reply.",
            "The legal basis is Article 6(1)(f).",
            "We delete the correspondence when it is clear whether further dialogue is needed, and at the latest when the purpose is fulfilled. In special cases we may keep it longer if needed to document the exchange.",
          ],
        },
        {
          heading: "Customers",
          paragraphs: [
            "TrustLog is not yet a subscription service with customer login. If you later become a customer, we may process name, address, services and payment details to deliver and administer the agreement.",
            "The legal basis would be Article 6(1)(b).",
            "When the service has been delivered and any outstanding matters are closed, we delete the data unless we are required to keep it longer — see bookkeeping below.",
          ],
        },
        {
          heading: "Newsletter",
          paragraphs: [
            "We do not have a newsletter. We do not send marketing emails and we do not collect consent for newsletters.",
            "If that changes, sign-up will require active consent (Article 6(1)(a)), and this policy will be updated.",
          ],
        },
        {
          heading: "Bookkeeping",
          paragraphs: [
            "If TrustLog issues invoices or keeps accounting records, we must retain them under the Danish Bookkeeping Act. They may contain ordinary personal data such as name, address and a description of the service.",
            "The legal basis is Article 6(1)(c), read with the Bookkeeping Act.",
            "We keep these records for at least five years after the end of the relevant financial year.",
          ],
        },
        {
          heading: "Job applications",
          paragraphs: [
            "We do not have a recruitment system. If you still send an unsolicited application, the legal basis is Article 6(1)(f). We assess whether it is relevant and delete it if there is no match.",
            "If you enter a recruitment process or are hired, you will receive separate information about that processing.",
          ],
        },
      ],
    },
    {
      heading: "Processors",
      paragraphs: [
        "Few can do everything alone, and neither can we. We may therefore use suppliers, some of whom are processors — for example for hosting, email or operations.",
        "If the website is hosted by an external provider, that provider processes server logs and any shared workspaces on our behalf.",
        "It is our responsibility to ensure your personal data is handled properly. We set requirements for partners and enter into processor agreements when a supplier processes personal data for us.",
      ],
    },
    {
      heading: "Disclosure of personal data",
      paragraphs: [
        "We do not disclose your personal data to third parties unless we are required to by law, or you ask us to (for example by sharing a workspace with a colleague).",
      ],
    },
    {
      heading: "Profiling and automated decisions",
      paragraphs: ["We do not carry out profiling or automated decision-making."],
    },
    {
      heading: "Transfers to third countries",
      paragraphs: [
        "As a starting point we use processors in the EU/EEA, or that store data in the EU/EEA.",
        "Where that is not possible, we may use processors outside the EU/EEA if they can provide appropriate protection — for example the European Commission’s standard contractual clauses or another valid transfer mechanism.",
      ],
    },
    {
      heading: "Security of processing",
      paragraphs: [
        "We keep processing secure by implementing appropriate technical and organisational measures.",
        "We have assessed the risk and designed around it: the draft stays with you by default, sharing is optional, and the finished record is downloaded to your own archive.",
        "A key measure is minimisation: TrustLog is built so you can describe categories and purposes without entering unnecessary data about individuals.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Under the GDPR you have a number of rights in relation to our processing of data about you. Contact us if you want to exercise them.",
      ],
      subsections: [
        {
          heading: "Right of access",
          paragraphs: [
            "You have the right to obtain access to the data we process about you, and to certain additional information.",
          ],
        },
        {
          heading: "Right to rectification",
          paragraphs: ["You have the right to have inaccurate data about you corrected."],
        },
        {
          heading: "Right to erasure",
          paragraphs: [
            "In certain cases you have the right to have data about you erased before our ordinary deletion date. You can always delete the local draft in the browser by starting over or clearing site storage.",
          ],
        },
        {
          heading: "Right to restriction of processing",
          paragraphs: [
            "In certain cases you have the right to restrict our processing. If so, we may thereafter only process the data — apart from storage — with your consent, or to establish, exercise or defend legal claims, or to protect a person or important public interests.",
          ],
        },
        {
          heading: "Right to object",
          paragraphs: [
            "In certain cases you have the right to object to our otherwise lawful processing of your personal data. You may also object to processing for direct marketing.",
          ],
        },
        {
          heading: "Right to data portability",
          paragraphs: [
            "In certain cases you have the right to receive your personal data in a structured, commonly used and machine-readable format and to have it transmitted to another controller. In TrustLog you can already export your record as PDF and Markdown.",
          ],
        },
      ],
    },
    {
      heading: "More about your rights",
      paragraphs: [
        "You can read more about your rights in the Danish Data Protection Agency’s guidance at www.datatilsynet.dk.",
      ],
    },
    {
      heading: "Withdrawal of consent",
      paragraphs: [
        "Where our processing is based on your consent, you have the right to withdraw it. Withdrawal does not affect the lawfulness of processing before the withdrawal. We do not currently collect consent for newsletters or cookies.",
      ],
    },
    {
      heading: "Complaint to the Data Protection Agency",
      paragraphs: [
        "You have the right to lodge a complaint with the Danish Data Protection Agency if you are dissatisfied with how we process your personal data. Contact details are at www.datatilsynet.dk.",
        "We generally encourage you to read more about the GDPR so you stay up to date with the rules.",
      ],
    },
  ],
};

export const privacy: Record<Locale, PrivacyDoc> = { da, en };
