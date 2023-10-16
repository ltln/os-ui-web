export default function mix(classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(" ");
}