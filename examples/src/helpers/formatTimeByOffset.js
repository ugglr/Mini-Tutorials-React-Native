export const formatTimeByOffset = (dateString, offset) => {
  // Params:
  // How the backend sends me a timestamp
  // dateString: on the form yyyy-mm-dd hh:mm:ss
  // offset: the amount of hours to add.

  // If we pass anything falsy return empty string
  if (!dateString) return '';
  if (dateString.length === 0) return '';

  // Step 1: Parse the backend date string

  // Get Parameters needed to create a new date object
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  const hour = dateString.slice(11, 13);
  const minute = dateString.slice(14, 16);
  const second = dateString.slice(17, 19);

  // Step: 2 Make a JS date object with the data
  const dateObject = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}`,
  );

  // Step 3: Get the current hours from the object
  const currentHours = dateObject.getHours();

  // Step 4: Add the offset to the date object
  dateObject.setHours(currentHours + offset);

  // Step 5: stringify the date object, replace the T with a space and slice off the seconds.
  const newDateString = dateObject
    .toISOString()
    .replace('T', ' ')
    .slice(0, 16);

  // Step 6: Return the new formatted date string with the added offset
  return `${newDateString}`;
};
