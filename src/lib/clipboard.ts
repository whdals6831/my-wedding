/** 클립보드 복사. 카카오톡 인앱 브라우저처럼 Clipboard API가 막힌 환경은 execCommand로 대체 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // 권한 거부 등은 아래 대체 방식으로 재시도
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    Object.assign(textarea.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      opacity: '0',
      fontSize: '16px', // iOS에서 포커스 시 확대 방지
    });
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const succeeded = document.execCommand('copy');
    textarea.remove();
    return succeeded;
  } catch {
    return false;
  }
}
