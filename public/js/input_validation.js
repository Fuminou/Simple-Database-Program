/*
*   artists validation
*/
// Called prior to submitting request to server-side JS. Prevent users from leaving both first name and last name AND stage name empty.
function validateStudentForm() {
    let input = document.forms["add-student-form"];
    if ((input['input-first_name'].value == "" && input['input-last_name'].value == "")) {
      alert("First name and last name cannot both be empty");
      return false;
    }
}

function validateRegisteredForm() {
  let input = document.forms["add-student-registration-form"];
  if ((input['input-registered'].value >=2 || input['input-registered'].value <=-1)) {
    alert("Registered cannot be less than 0 or greater than 1. Please enter 0-unregistered or 1-registered");
    return false;
  }
}
