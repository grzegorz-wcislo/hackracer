enum CharType {
  UNTYPED,
  CURSOR,
  TYPED,
  ERROR,
  GARBAGE,
}

const typeClass = (type: CharType): string => {
  switch (type) {
    case CharType.UNTYPED:
      return 'char char-untyped';
    case CharType.CURSOR:
      return 'char char-cursor';
    case CharType.TYPED:
      return 'char char-typed';
    case CharType.ERROR:
      return 'char char-error';
    case CharType.GARBAGE:
      return 'char char-garbage';
  }
};

export default CharType;

export { typeClass };
