// Central site-level configuration and constants.
// Prefer providing VITE_CONTACT_EMAIL in your .env to avoid hardcoding email addresses.
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "ceejaycreationofficial@gmail.com";
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "254758934463";

export function openWhatsApp(message) {
	const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
	window.open(url, "_blank", "noopener,noreferrer");
}

export function openEmail(subject, message) {
	window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
