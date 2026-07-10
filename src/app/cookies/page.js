import LegalDocument from '@/components/legal/components/LegalDocument';

export const metadata = {
  title: 'Cookie Policy · Virya',
  description: 'How Virya Autonomous Technologies uses cookies on this website.',
};

const SECTIONS = [
  {
    heading: 'Use of Cookies',
    paragraphs: [
      'Lorem ipsum dolor sit amet consectetur. Aliquam gravida risus vivamus eu tortor tempus morbi. In pellentesque et sit sem. At amet in id tristique nibh enim iaculis laoreet. Ornare suscipit etiam turpis hendrerit a adipiscing diam. Sed quis sed et sem faucibus diam amet. Ultricies risus et semper amet risus. Sit aliquet iaculis ultrices pulvinar imperdiet sed blandit nibh. Rhoncus maecenas in eu tristique consectetur tempor volutpat. Ac diam turpis.',
      'Lorem ipsum dolor sit amet consectetur. Amet nullam habitasse justo cras lacus mauris arcu posuere morbi. Phasellus tortor condimentum sit ultricies pellentesque libero interdum aliquam curabitur. Ultrices egestas blandit aliquet sagittis habitant. Aliquet euismod rutrum nullam vitae at magna id consequat dignissim. Consectetur fames montes dignissim ut nunc dignissim ut eu. Placerat eget enim pellentesque suspendisse. Eu congue in iaculis sed ut gravida enim a sed. Magna tincidunt vitae tempor neque at varius vestibulum lorem morbi. Vitae sollicitudin ipsum tortor nec tortor. Id egestas diam leo id vulputate elementum nibh. Imperdiet velit hendrerit enim sed tellus. Id maecenas auctor neque suspendisse. Ut ac accumsan platea eu a.',
      'Lorem ipsum dolor sit amet consectetur. Leo imperdiet morbi urna massa urna. Dictum integer in at in fringilla. Mattis nisi urna nibh adipiscing non vitae lacus feugiat scelerisque. Risus vitae ipsum mattis nibh eu eros pellentesque mauris id. Quis pretium pellentesque ut consectetur aliquet vulputate. Leo netus proin donec at suscipit ultrices porta aliquet aliquam. Et diam ante a vel at aenean consectetur sed. Lacus sed arcu cursus risus elit suspendisse.',
      {
        intro: 'If you provide Virya with user information, you have the following rights with respect to that information:',
        bullets: [
          'Lorem ipsum dolor sit amet consectetur. Ultricies.',
          'Lorem ipsum dolor sit amet consectetur. Vitae purus in a diam. Diam egestas ipsum sed gravida sit quis diam.',
          'Lorem ipsum dolor sit amet consectetur. Maecenas at sit nec.',
          'Lorem ipsum dolor sit amet consectetur. Nec diam neque varius magna ligula at ac.',
          'Lorem ipsum dolor sit amet consectetur. Habitasse mattis sit.',
          'Lorem ipsum dolor sit amet consectetur. Morbi posuere.',
        ],
      },
      'Lorem ipsum dolor sit amet consectetur. Pellentesque libero id sagittis porttitor lorem ut. Scelerisque ornare integer tortor eu donec molestie arcu. Vestibulum senectus urna egestas ut bibendum etiam. Nulla mus rhoncus cursus urna in lectus nibh eleifend. Ac augue nunc penatibus purus. Id aliquam at nec arcu vestibulum sit. Ipsum purus cursus malesuada condimentum. Massa purus vulputate facilisi nibh ac donec risus tortor. Lacus nullam lobortis lectus lobortis.',
      {
        text: 'To exercise any of these rights, please contact us at ',
        link: { text: 'info@virya.ai', href: 'mailto:info@virya.ai' },
      },
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      lastUpdated="April 12, 2026"
      intro="Lorem ipsum dolor sit amet consectetur. Congue nisi congue aliquet faucibus massa sit nibh aliquam quis. Potenti sit pellentesque facilisi scelerisque nulla leo nulla etiam senectus. Quis curabitur libero ornare sit sit dolor fringilla risus. Aliquam pellentesque dolor egestas molestie consequat."
      sections={SECTIONS}
    />
  );
}
