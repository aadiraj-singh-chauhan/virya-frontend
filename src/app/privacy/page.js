import LegalDocument from '@/components/legal/components/LegalDocument';

export const metadata = {
  title: 'Privacy Policy · Virya',
  description: 'How Virya Autonomous Technologies collects, uses, and protects your personal information.',
};

const SECTIONS = [
  {
    heading: 'Collection of your Personal Information',
    paragraphs: [
      'Lorem ipsum dolor sit amet consectetur. Enim odio porttitor tortor et donec pharetra eu sed elementum. At eu et enim risus orci vel amet scelerisque. Aliquet purus dictumst donec purus eget mauris velit semper morbi. Est orci neque eu mi commodo purus sagittis eu tortor. Pellentesque libero feugiat cum egestas.',
      'Lorem ipsum dolor sit amet consectetur. Dictum rhoncus orci condimentum convallis pellentesque. Maecenas vitae blandit orci posuere ultricies. Faucibus nulla erat nisi eget. Diam habitant lectus lobortis sit urna. Mauris non vehicula mi amet auctor. Duis at purus fringilla facilisis placerat lorem feugiat adipiscing.',
      'Ultricies placerat id tincidunt arcu. Cras scelerisque dui tortor leo eget sit purus tristique. Vitae at libero sed ligula. Amet scelerisque nisl quam egestas turpis.',
      'Lorem ipsum dolor sit amet consectetur. Enim tellus pharetra leo nulla senectus volutpat scelerisque velit integer. Eros iaculis facilisis purus faucibus. Ut id amet faucibus vivamus non sed aliquet. Nulla enim varius condimentum a ut vulputate sit aliquet. Enim tempor dolor amet volutpat ullamcorper. Pellentesque quis leo faucibus quis. In iaculis arcu congue sem vitae. Faucibus commodo velit interdum porttitor nunc vitae. Quis felis cursus ut aliquam. Gravida purus erat eros sapien. Aliquet in massa venenatis ut sit venenatis morbi ornare. Arcu elementum ipsum pharetra posuere at metus posuere consequat massa. Pretium.',
      'Lorem ipsum dolor sit amet consectetur. At et sed consequat tempor diam eu massa ultricies in. Iaculis lacus arcu egestas purus ipsum condimentum ipsum. Nulla mi id sem tincidunt faucibus dui felis neque consequat. Ut a commodo imperdiet risus sed. Ullamcorper vitae in ac semper sed etiam lectus cras facilisis.',
    ],
  },
  {
    heading: 'Use of your Personal Information',
    paragraphs: [
      'Lorem ipsum dolor sit amet consectetur. Aliquam hac a libero arcu condimentum. Cursus ipsum adipiscing turpis mus amet rutrum nunc in tristique. Nisl neque scelerisque risus vel. Dui lectus sit pellentesque quisque ultrices dignissim tempor. Hendrerit aliquam egestas nisi sit orci massa. Bibendum vel commodo quisque vel sagittis. In risus urna augue sed sit consectetur. Risus parturient massa viverra aliquet amet ornare pretium et.',
      'Lorem ipsum dolor sit amet consectetur. Congue imperdiet cras sed ac in viverra eget. Venenatis nunc vitae condimentum id sodales sed quis pretium. Nullam eget maecenas nunc eget. Aliquam ante luctus lacus tortor est facilisis enim odio ornare. Eget integer tristique cras dui tellus mattis vel sapien. Sodales duis viverra et amet in mauris quam. Nisl feugiat amet viverra fermentum ut condimentum. Lobortis senectus feugiat mi purus. Pulvinar nulla risus turpis praesent feugiat nibh arcu ornare erat. In et vel est in semper nunc pellentesque egestas. Massa nulla dignissim massa nec condimentum. Erat pretium semper ante posuere adipiscing pretium molestie neque et. Quisque fringilla congue ultricies vitae vel massa dolor sed. Quam tellus.',
      'Lorem ipsum dolor sit amet consectetur. Maecenas aliquet morbi pulvinar tellus egestas viverra diam enim eleifend. In pellentesque vitae odio id sociis interdum vitae non. Lobortis pretium quisque pretium aliquam vitae sed eleifend. Arcu condimentum orci pulvinar enim amet cum. Duis euismod at porttitor aliquam consequat. Leo nisl in at lorem sit vitae feugiat. Id purus sed mollis vitae auctor lorem. Natoque aliquam mauris ut diam morbi nunc.',
    ],
  },
  {
    heading: 'Security of your Personal Information',
    paragraphs: [
      'Lorem ipsum dolor sit amet consectetur. Adipiscing enim sed morbi sit sit magna suspendisse. Id dui quis diam rutrum quis. Egestas turpis nulla sagittis curabitur. Mi quis eu pretium eu a sit. Ac tristique tortor mauris nam urna vitae lectus elit senectus. Sapien nunc tristique lectus integer. At massa sed eu imperdiet risus. Rhoncus vivamus quis dictum maecenas facilisi netus. Sed venenatis ullamcorper tortor egestas maecenas ac purus cursus sociis. Mauris scelerisque porttitor porttitor convallis penatibus et sit vulputate suscipit.',
    ],
  },
  {
    heading: 'Changes to this Statement',
    paragraphs: [
      'Lorem ipsum dolor sit amet consectetur. Fringilla est ac at suspendisse augue nisl neque vitae. Dolor nunc quam quis parturient curabitur lectus mattis eget mi. Elementum rhoncus sem in blandit. Ut nunc viverra lectus fermentum amet nisl bibendum non. Ultricies accumsan sagittis quam ut arcu. Quam lacus.',
    ],
  },
  {
    heading: 'Enforcement of this Privacy Statement',
    paragraphs: [
      'Lorem ipsum dolor sit amet consectetur. Et mi eleifend fringilla justo nisi in interdum rhoncus adipiscing. Et nullam vitae sed est mauris quis augue. Egestas adipiscing a posuere aliquet diam. Interdum sollicitudin nam sit erat posuere sagittis mattis integer. Pulvinar enim enim tortor id a quis ut amet feugiat. Risus.',
    ],
  },
  {
    heading: 'Contact Information',
    paragraphs: [
      'Virya welcomes your comments regarding this Statement of Privacy. If you believe that Virya has not adhered to this Statement, please contact us at info@virya.ai We will use commercially reasonable efforts to promptly determine and remedy the problem. Virya is located at 220, Bommasandra Industrial Area, Bommasandra, Bengaluru, Karnataka 560099',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lastUpdated="April 12, 2026"
      intro="Lorem ipsum dolor sit amet consectetur. Congue nisi congue aliquet faucibus massa sit nibh aliquam quis. Potenti sit pellentesque facilisi scelerisque nulla leo nulla etiam senectus. Quis curabitur libero ornare sit sit dolor fringilla risus. Aliquam pellentesque dolor egestas molestie consequat."
      sections={SECTIONS}
    />
  );
}
