"use client";
import React from "react";

function Page() {
  return (
    <div className="w-full min-h-screen bg-zinc-100 text-black p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#99C3FC] to-[#6498E1] shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h1 className="text-white font-semibold text-xl md:text-2xl mb-2">
                Manage your time well
              </h1>
              <img
                className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto md:mx-0"
                src="https://s3-alpha-sig.figma.com/img/05fa/1c81/94cf72c5d321a59562d9b6cbcd9bc4a1?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=feOoNNtLIajd7GOKZenIIouf6B8n3IQSIqC4o-7Z1RmS4JLVeEUUm3OOjHxqEs-VRzhewscEGFZEVsgKJPD3DxuSPoAPYZ6fcYIXFX0DmIdyUXsl87g3ECGfQqCwof6hvfT-vxSHJh-Iqxl4u2F6qU9tTGIw-HUt2GNVmJonQkOuCkp6awM8YW9XT3ZumKwtHUpSqUwLs6nvt2dqoOPVec1ey8wTifJnmpN3e3YSYSCYdeT8oMDPB75HYWaYsVPEdOThc-BG0WazSeA1v5xrc3ZGDkLH4E~kIMY-Hqpr-K2DrS~m5K5Xncj5awg0yHDQt~Qro6Zn-7Cnt4e4-Fm8aA__"
                alt="Time management illustration"
              />
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                src="https://s3-alpha-sig.figma.com/img/1068/25fa/78127049f014ed474ff6b1e4e0ad9fb6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y6-EKjroy061h2AhFilzetc-mT8It4UkgY400QvAm3dPG2amOhltvHUTFPVVBAdVUxsU7zrDkoS-Z36ceYtmNlfgGmzwr6OOPkWzp23Rzhbnhf7wL4NOhY2s-w9hJt4HJXP28p5r88l0YxXSYdq~p9g8s3feSQbrQUpIy97t5I9qtQ0Fp59Fwqj-evg9PvIKX43lX9Cev8e0Jdoy6-Br2OwSE7P8OPLRKEvhP85br12usm8ErLGvKNDkHzwYPXaojxFmazCuY-SlyR6t8wm63buG-TadZsD0HOpIVF21tYZY9rtlO5ThlBIaMBnInbxYesmFHnhLAjJ2teUuLa23JA__"
                alt="Book and bookmark icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;