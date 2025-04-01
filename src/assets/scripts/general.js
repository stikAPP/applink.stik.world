const generalFn = function () {
    const $year = document.getElementById('year-copy');
    if ($year) {
        const year = new Date().getFullYear();
        $year.textContent = year.toString();
    }
}
export default generalFn;
