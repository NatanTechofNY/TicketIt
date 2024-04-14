'use client';

/**
 * Import necessary libraries and components
 */
import { LinkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

/**
 * ShareLinkButton function is a component that renders a button for sharing the current page's link.
 * It uses the useState hook to manage the button's clicked state.
 * When the button is clicked, the current page's URL is copied to the clipboard, and the clicked state is set to true.
 * After 1.5 seconds, the clicked state is set back to false.
 *
 * @function
 * @returns {JSX.Element} The rendered ShareLinkButton component
 */
export default function ShareLinkButton() {
  /**
   * Use the useState hook to manage the button's clicked state
   * @type {Array}
   */
  const [clicked, setClicked] = useState(false);

  /**
   * Handle the button click event
   * When the button is clicked, the current page's URL is copied to the clipboard, and the clicked state is set to true.
   * After 1.5 seconds, the clicked state is set back to false.
   */
  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  /**
   * Render the ShareLinkButton component
   * The button's text changes based on the clicked state.
   */
  return (
      <button onClick={handleClick}
              className="border flex gap-1 items-center px-2 py-1 rounded
                 text-slate-500 text-sm
                 hover:bg-orange-100 hover:text-slate-700 ml-auto">
        <LinkIcon className="h-4 w-4" />
        {clicked ? 'Link copied!' : 'Share link'}
      </button>
  );
}
