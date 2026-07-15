export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function buildContactMailtoLink(formData: ContactFormData, recipientEmail: string): string {
  const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
  const body = encodeURIComponent(
    [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      '',
      formData.message
    ].join('\n')
  );

  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
