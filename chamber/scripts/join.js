const openButtons = document.querySelectorAll('.open-modal');

document.addEventListener('DOMContentLoaded', () => {
    const timeStamp = document.getElementById('time-stamp');
    if (timeStamp) {
        timeStamp.value = new Date().toISOString();
    }
    else {
        console.error('Hidden input not found');
    }
});

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const section = button.closest('section');
        if (!section) return;

        const dialog = section.querySelector('.membership-dialog');
        if (!dialog) return;

        dialog.showModal();

        const closeBtn = dialog.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                dialog.close();
            })
        }
    })
})


