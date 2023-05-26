export default function transformLink (value) {
    let link= value.normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(' ', '_')
    return link
}