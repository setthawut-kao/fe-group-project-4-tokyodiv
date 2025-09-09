<<<<<<< HEAD
import { useAuthStore } from "@/stores/useAuthStore"
import { HeroSection } from "@/components/features/home/HeroSection"
import { NewArrivalsSection } from "@/components/features/home/NewArrivalsSection"
import { MainProduct } from "@/components/features/home/MainProduct"
import { Button } from "@/components/ui/button"

function DevAuthSwitch() {
  const { user, login, logout } = useAuthStore()
  const mockUser = { name: "Jane Doe" }

  return (
    <div className="fixed bottom-4 right-4 z-[999] bg-slate-800 text-white p-3 rounded-lg shadow-lg">
      <h4 className="font-bold text-center mb-2">Dev Switch</h4>
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <p>Logged in as: {user.name}</p>
          <Button onClick={logout} variant="destructive" size="sm">
            Force Logout
          </Button>
        </div>
      ) : (
        <Button onClick={() => login(mockUser)} size="sm">
          Force Login
        </Button>
      )}
    </div>
  )
}
=======
import { HeroSection } from "@/components/features/home/HeroSection";
import { NewArrivalsSection } from "@/components/features/home/NewArrivalsSection";
import { MainProduct } from "@/components/features/home/MainProduct";
>>>>>>> 1798bb6ac483571ea286220524f1d663364bc13b

export const HomePage = () => {
  return (
    <>
      <section className="flex flex-col gap-15 lg:gap-30 my-10 lg:my-20 ">
        <HeroSection />
        <NewArrivalsSection />
        <MainProduct />
      </section>
    </>
  )
}
