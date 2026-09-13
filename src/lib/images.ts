// import.meta.glob 옵션은 Vite가 정적으로 분석하므로 객체 리터럴로 직접 써야 한다
const photoModules = import.meta.glob<string>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});
const galleryModules = import.meta.glob<string>('../assets/gallery/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

/** macOS는 한글 파일명을 자모 분리형(NFD)으로 저장하므로 NFC로 맞춰서 비교한다 */
const toFileName = (path: string) => path.slice(path.lastIndexOf('/') + 1).normalize('NFC');

const photosByName = new Map(Object.entries(photoModules).map(([path, url]) => [toFileName(path), url]));

/** src/assets/photos/ 안의 파일 URL. 파일이 없으면 undefined → 플레이스홀더 표시 */
export function getPhoto(fileName?: string): string | undefined {
  if (!fileName) return undefined;
  return photosByName.get(fileName.normalize('NFC'));
}

/** src/assets/gallery/ 안의 사진들을 파일명 순서(01, 02, … 10)대로 정렬 */
export const galleryImages: string[] = Object.keys(galleryModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => galleryModules[key]);
