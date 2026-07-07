export const parseRootCause = (text) => {

    try {

        let cleaned = text.trim();

        /*
        ==========================================
        Remove Markdown
        ==========================================
        */

        if (cleaned.startsWith("```")) {

            cleaned = cleaned
                .replace(/^```json/i, "")
                .replace(/^```/, "") 
                .replace(/```$/, "")
                .trim();

        }

        const result = JSON.parse(cleaned);

        /*
        ==========================================
        Validate
        ==========================================
        */

        if (!result.summary) {

            throw new Error(
                "Summary missing."
            );

        }

        if (
            !Array.isArray(
                result.possibleCauses
            )
        ) {

            throw new Error(
                "Possible causes missing."
            );

        }

        if (
            !Array.isArray(
                result.recommendedActions
            )
        ) {

            throw new Error(
                "Recommendations missing."
            );

        }

        /*
        ==========================================
        Normalize Confidence
        ==========================================
        */

        result.possibleCauses =
            result.possibleCauses.map(
                cause => ({

                    ...cause,

                    confidence:

                        cause.confidence <= 1
                            ? Math.round(
                                  cause.confidence * 100
                              )
                            : cause.confidence,

                })
            );

        return result;

    } catch (err) {

        console.error(err);

        throw new Error(
            "Invalid AI response."
        );

    }

};