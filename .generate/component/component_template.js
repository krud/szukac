//component.tsx
exports.component = name => `import React from 'react';
import './${name}.css';
export interface ${name}Props {}

function ${name}() {
    return(
        <div>${name} works!</div>
    )
};
export default ${name};
`;

//component.test.tsx
exports.test = name => `import React from 'react';
import { render } from '@testing-library-react';
import ${name} from './${name}';

describe('${name} Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<${name} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
`;

//index.ts
exports.barrel = name => `import ${name} from './${name}';
export default ${name};
`;