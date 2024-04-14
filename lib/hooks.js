import { useState } from 'react';

/**
 * useFormState is a custom React hook that manages the state of a form.
 * It takes an action function as an argument, which is called when the form is submitted.
 * The action function should take a FormData object as an argument and return a response object.
 * The response object should have an isError property that is true if an error occurred, and a message property that contains the error message.
 * The hook returns an array containing the state object and the handleSubmit function.
 * The state object has a loading property that is true while the form is being submitted, and an error property that contains the error message if an error occurred.
 * The handleSubmit function should be passed to the onSubmit prop of the form.
 *
 * @function
 * @param {function} action - The function to call when the form is submitted.
 * @returns {Array} An array containing the state object and the handleSubmit function.
 */
export function useFormState(action) {
  /**
   * The state object.
   * @type {Object}
   * @property {boolean} loading - Whether the form is being submitted.
   * @property {string|null} error - The error message, or null if no error occurred.
   */
  const [state, setState] = useState({loading: false, error: null});

  /**
   * The function to call when the form is submitted.
   * It prevents the default form submission, sets the loading state to true, calls the action function with the form data,
   * and updates the state based on the response.
   *
   * @async
   * @function
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async(event) => {
    event.preventDefault();
    setState({loading: true, error: null});
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await action(formData);
    if (response?.isError) {
      setState({loading: false, error: response.message});
    } else {
      setState({loading: false, error: null});
      form.reset();
    }
  };

  return [state, handleSubmit];
}