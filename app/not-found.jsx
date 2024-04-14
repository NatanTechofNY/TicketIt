/**
 * Import necessary components
 */
import Heading from '@/components/Heading';

/**
 * NotFoundPage function is the main component of the 404 Not Found page.
 * It renders a Heading component with the text "Not Found" and a paragraph with the text "Oops."
 *
 * @function
 * @returns {JSX.Element} The rendered NotFoundPage component
 */
export default function NotFoundPage() {
    return (
        <>
            {/* Render the Heading component with the text "Not Found" */}
            <Heading>Not Found</Heading>

            {/* Render a paragraph with the text "Oops." */}
            <p>
                Oops.
            </p>
        </>
    );
}