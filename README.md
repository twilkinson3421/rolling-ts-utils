# **Rolling TS Utils**

A small library which exposes some helpful generic utility types. _This is an early version and currently contains only a few types, but will be gradually expanded and improved._

## Installation

```bash
npm install --save-dev rolling-ts-utils
```

## Basic Usage

```ts
import type { ReplaceStringPart } from "rolling-ts-utils";

const str = "This is a cool {noun}." as const;

let sentence: ReplaceStringPart<typeof str, "dog">;
//  ^? typeof sentence = "This is a cool dog."
```

## Available Types

### `ReplaceStringPart<OriginalString, NewString>`

- `OriginalString`: The string to be replaced
- `NewString`: The string to replace the first occurrence of `{string}` where `string` is any string
- _If no `{string}` is found, the original string is returned_

```ts
const str = "This is a cool {noun}." as const;

let sentence: ReplaceStringPart<typeof str, "dog">;
//  ^? typeof sentence = "This is a cool dog."
```

### `ReplaceStringPart<OriginalString, NewString, Match>`

- `OriginalString`: The string to be replaced
- `NewString`: The string to be inserted
- `Match`: The substring to be replaced
- _If no match is found, the original string is returned_

```ts
const str = "This is a cool {noun}." as const;

let sentence: ReplaceStringPart<typeof str, "cat", "{noun}">;
//  ^? typeof sentence = "This is a cool cat."
```

### `ReplaceMultipleStringParts<OriginalString, NewStrings, Index>`

- `OriginalString`: The string to be replaced
- `NewStrings`: An array of strings to be inserted in order
- `Index`: The index of the substring to be replaced (this should normally be left empty)
- _If no `{string}` is found, the original string is returned_

**_This will break if the `NewStrings` array contains more than 1000 elements_**

```ts
const str = "This is {article} {adjective} {noun}." as const;

let sentence: ReplaceMultipleStringParts<
  typeof str,
  ["an", "amazing", "rabbit"]
>;
//  ^? typeof sentence = "This is an amazing rabbit."
```

### `Inc<OriginalNum>`

- `OriginalNum`: A number to be incremented

**_This will break if `OriginalNum` is greater than 999_**

```ts
type OriginalNum = 5;

type IncrementedNum = Inc<OriginalNum>;
//   ^? type IncrementedNum = 6
```
