import ai from "./ai.service.js";

/*
==========================================
Generate Embedding
==========================================
*/

export const generateEmbedding = async (text) => {

    if (!text || !text.trim()) {

        throw new Error("Text is required for embedding.");

    }

    const response = await ai.models.embedContent({

        model: "gemini-embedding-001",

        contents: text,

        config: {

            outputDimensionality: 768,

        },

    });

    if (!response.embeddings?.length) {

        throw new Error("Embedding generation failed.");

    }

    return response.embeddings[0].values;

};