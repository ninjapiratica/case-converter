# ninjapiratica-case-converter
Convert objects to a different case. camelCase, PascalCase, snake_case.

## Installation
```sh
npm install ninjapiratica-case-converter --save
```

## Usage

### Typescript

```typescript
import { convertCamelCase } from 'ninjapiratica-case-converter';

var obj = { Key: 'value', ... };
var newObj = convertToCamelCase(obj);
// newObj = { key: 'value', ... }
```

### Javascript

```javascript
var caseConverter = require('ninjapiratica-case-converter');

var obj = { Key: 'value', ... };
var newObj = caseConverter.convertToCamelCase(obj);
// newObj = { key: 'value', ... }
```