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

export type ReplaceMultipleStringParts<
  OriginalString extends string,
  NewStrings extends string[],
  Index extends number = 0
> = OriginalString extends `${infer Start}\{${string}\}${infer End}`
  ? Index extends NewStrings["length"]
    ? `${Start}${NewStrings[Index]}${End}`
    : ReplaceMultipleStringParts<
        `${Start}${NewStrings[Index]}${End}`,
        NewStrings,
        Inc<Index>
      >
  : OriginalString;
