import { GUIDE_CATEGORIES, GUIDES } from "@/data/guides";
import type { Guide, GuideCategory, GuideCategoryId } from "@/types/guide";

export function getCategory(id: GuideCategoryId): GuideCategory {
  return (
    GUIDE_CATEGORIES.find((category) => category.id === id) ?? {
      id,
      labelPt: id,
      labelEn: id,
    }
  );
}

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function getGuideSlugs(): string[] {
  return GUIDES.map((guide) => guide.slug);
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Busca por nome PT/EN, categoria e aliases. */
export function filterGuides(
  query: string,
  categoryId: GuideCategoryId | "all"
): Guide[] {
  const needle = normalize(query);

  return GUIDES.filter((guide) => {
    if (categoryId !== "all" && guide.category !== categoryId) {
      return false;
    }

    if (!needle) return true;

    const category = getCategory(guide.category);
    const haystack = [
      guide.namePt,
      guide.nameEn,
      guide.slug,
      guide.summary,
      guide.quest,
      category.labelPt,
      category.labelEn,
      ...(guide.aliases ?? []),
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(needle);
  });
}
