import type { Metadata } from "next";

interface Props {
  params: { products: string };
  children: React.ReactNode;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
const apiEndpoint = process.env.API_ENDPOINT_DATA || "http://localhost:5000/api";

async function getProduct(id: string) {
  try {
    const res = await fetch(`${apiEndpoint}/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.data && data?.success !== undefined) ? data.data : (data?._doc || data);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { products: string } }): Promise<Metadata> {
  const product = await getProduct(params.products);

  if (!product || !product.name) {
    return {
      title: "Produk Apple Tidak Ditemukan",
      description: "Produk Apple yang Anda cari tidak tersedia atau telah dipindahkan di Cyber Apple Store.",
    };
  }

  const categoryName = typeof product.category === "object" ? product.category?.name : product.category;
  const rawImage = product.image_thumbnail || "";
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `${apiEndpoint.replace(/\/api$/, "")}/images${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`;

  const cleanDescription = product.description
    ? `${product.description.slice(0, 155).trim()}... Beli ${product.name} bergaransi resmi Apple di Cyber Store.`
    : `Beli ${product.name} original bergaransi resmi Apple di Cyber Apple Store Indonesia. Promo cicilan 0% dan pengiriman kilat.`;

  return {
    title: `${product.name} - Spesifikasi, Promo & Harga Resmi`,
    description: cleanDescription,
    keywords: [
      product.name,
      `Harga ${product.name}`,
      `Beli ${product.name}`,
      categoryName || "Apple",
      "Apple Store Indonesia",
      "Garansi Resmi Apple",
      "Cicilan 0%",
    ],
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: `${siteUrl}/shop/${product._id}`,
      siteName: "Cyber Apple Store Indonesia",
      title: `${product.name} - Garansi Resmi Apple | Cyber Store`,
      description: cleanDescription,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Garansi Resmi Apple`,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailLayout({ params, children }: Props) {
  const product = await getProduct(params.products);

  const rawImage = product?.image_thumbnail || "";
  const imageUrl = rawImage.startsWith("http")
    ? rawImage
    : `${apiEndpoint.replace(/\/api$/, "")}/images${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`;

  const structuredData = product
    ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.name,
        image: imageUrl,
        description: product.description || `Produk resmi ${product.name} bergaransi resmi Apple Indonesia.`,
        sku: product._id,
        mpn: product._id,
        brand: {
          "@type": "Brand",
          name: "Apple",
        },
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/shop/${product._id}`,
          priceCurrency: "IDR",
          price: product.price,
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Cyber Apple Store Indonesia",
          },
        },
      }
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      {children}
    </>
  );
}
