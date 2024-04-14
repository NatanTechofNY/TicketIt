/**
 * Heading function is a component that renders a heading.
 * It takes children as props and renders them within an h1 tag.
 * The h1 tag has a set of predefined classes for styling.
 *
 * @function
 * @param {JSX.Element} children - The children to be rendered within the h1 tag.
 * @returns {JSX.Element} The rendered Heading component
 */
export default function Heading({ children }) {
  return (
      <h1 className="font-bold font-roboto pb-3 text-2xl">
        {children}
      </h1>
  );
}