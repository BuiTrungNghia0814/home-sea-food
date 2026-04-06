import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { StorySection } from '@/components/home/StorySection'
import { TrustSection } from '@/components/home/TrustSection'
import { ComboSection } from '@/components/home/ComboSection'
import { BlogSection } from '@/components/home/BlogSection'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <StorySection />
      <ComboSection />
      <TrustSection />
      <BlogSection />
      <CTASection />
    </>
  )
}
