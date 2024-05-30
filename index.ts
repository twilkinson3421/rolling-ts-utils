export type ReplaceStringPart<
  OriginalString extends string,
  NewString extends string,
  Match extends string = `\{${string}\}`
> = OriginalString extends `${infer Start}${Match}${infer End}`
  ? `${Start}${NewString}${End}`
  : OriginalString;

export type Inc<N extends number, T extends any[] = []> = T["length"] extends N
  ? [...T, any]["length"]
  : Inc<N, [...T, any]>;

export type ReplaceOrderedStringParts<
  OriginalString extends string,
  NewStrings extends string[],
  Index extends number = 0
> = OriginalString extends `${infer Start}\{${string}\}${infer End}`
  ? Index extends NewStrings["length"]
    ? `${Start}${NewStrings[Index]}${End}`
    : ReplaceOrderedStringParts<
        `${Start}${NewStrings[Index]}${End}`,
        NewStrings,
        Inc<Index>
      >
  : OriginalString;

export type ReplaceMultipleStringParts<
  OriginalString extends string,
  Keys extends string[],
  Values extends string[],
  Index extends number = 0
> = OriginalString extends `${infer Start}${Keys[Index]}${infer End}`
  ? Index extends Keys["length"]
    ? `${Start}${Values[Index]}${End}`
    : ReplaceMultipleStringParts<
        `${Start}${Values[Index]}${End}`,
        Keys,
        Values,
        Inc<Index>
      >
  : OriginalString;

export type ReplaceAllStringParts<
  OriginalString extends string,
  NewString extends string
> = OriginalString extends `${infer Start}\{${string}\}${infer End}`
  ? ReplaceAllStringParts<`${Start}${NewString}${End}`, NewString>
  : OriginalString;
