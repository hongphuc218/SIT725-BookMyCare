const doctorTab = document.getElementById('doctorTab');
const clientTab = document.getElementById('clientTab');
const doctorForm = document.getElementById('doctorForm');
const clientForm = document.getElementById('clientForm');

doctorTab.addEventListener('click', () => {
    // Doctor Tab Active
    doctorTab.classList.add('bg-blue', 'text-white', 'border-blue');
    doctorTab.classList.remove('bg-white', 'text-gray-500');

    // Client Tab Inactive
    clientTab.classList.add('bg-white', 'text-gray-500', 'border-blue');
    clientTab.classList.remove('bg-blue', 'text-white');

    // Show Doctor Form, Hide Client Form
    doctorForm.classList.remove('hidden');
    clientForm.classList.add('hidden');
});

clientTab.addEventListener('click', () => {
    // Client Tab Active
    clientTab.classList.add('bg-blue', 'text-white', 'border-blue');
    clientTab.classList.remove('bg-white', 'text-gray-500');

    // Doctor Tab Inactive
    doctorTab.classList.add('bg-white', 'text-gray-500', 'border-blue');
    doctorTab.classList.remove('bg-blue', 'text-white');

    // Show Client Form, Hide Doctor Form
    clientForm.classList.remove('hidden');
    doctorForm.classList.add('hidden');
});
