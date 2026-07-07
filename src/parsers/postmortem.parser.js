export const parsePostmortem = (text) => {

    const cleaned = text

        .replace(/```json/g, "")

        .replace(/```/g, "")

        .trim();

    return JSON.parse(cleaned);

};