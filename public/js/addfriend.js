// Add event listener to all forms with class "addFriendForm"
document.querySelectorAll('.addFriendForm').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const friemailValue = this.querySelector('input[name="friemail"]').value 
        // alert("......."+friemailValue)
        // const formData = new FormData(this); // Serialize form data
          
        // Send AJAX request to server
        fetch(this.action, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                 
              },
            body:  JSON.stringify({friemail:friemailValue}) 
        })
        .then(response => {
            // alert(response.ok)
            if (!response.ok) {
                // If the response status is not ok, throw error with message
                throw new Error('Network response was not ok');
            }
            // If the response is ok, return the response JSON
            return response.json();
        })
        .then(responseData => {
            this.remove()
            // Handle the successful response
            console.log('Server response:', responseData);
            // Optionally, update the UI based on the response data
        })
        .catch(error => {
            // Handle error response
            console.error('Error adding friend:', error);
            // Update UI with error message
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Error adding friend: ' + error.message;
            document.body.appendChild(errorMessage);
        });
    });
});
