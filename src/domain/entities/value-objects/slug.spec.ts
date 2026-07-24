import { test, expect } from "vitest";
import { Slug } from "./slug.js";

test('it should be able to create a slug', () => {
    const slug = Slug.createFromText("An Example Question Title")

    expect(slug.value).toEqual("an-example-question-title")
})