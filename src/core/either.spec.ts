import { Either, left, right } from "./either.js";
function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  } else {
    return left("error");
  }
}

test("Success result", () => {
  const successResult = doSomething(true);
  expect(successResult.isRight()).toEqual(true);
  expect(successResult.isLeft()).toEqual(false);
});

test("Error result", () => {
  const errorResult = doSomething(false);
  expect(errorResult.isRight()).toEqual(false);
  expect(errorResult.isLeft()).toEqual(true);
});
