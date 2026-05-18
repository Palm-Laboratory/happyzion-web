"use client";

const inputClassName =
  "apply-form-input type-body-xs h-9 w-full rounded-[5px] border border-white/10 bg-white/[0.06] px-5 text-white outline-none transition focus:border-[#e4b96b]/70";

export default function ApplyForm() {
  return (
    <form className="mt-8 grid w-full gap-4 rounded-[12px] bg-white/[0.04] px-6 py-7 md:mt-0 md:max-w-[294px]">
      <label className="grid gap-2">
        <span className="type-body-xs font-semibold text-white/80">이름</span>
        <input className={inputClassName} type="text" name="name" placeholder="이름을 입력하세요" />
      </label>

      <label className="grid gap-2">
        <span className="type-body-xs font-semibold text-white/80">연락처</span>
        <input className={inputClassName} type="tel" name="phone" placeholder="연락처를 입력하세요" />
      </label>

      <label className="grid gap-2">
        <span className="type-body-xs font-semibold text-white/80">이메일</span>
        <input className={inputClassName} type="email" name="email" placeholder="이메일을 입력하세요" />
      </label>

      <fieldset className="grid gap-2">
        <legend className="type-body-xs font-semibold text-white/80">희망 요일</legend>
        <div className="flex gap-5 pt-2">
          {["주일 반", "주중 반"].map((label, index) => (
            <label
              key={label}
              className="type-body-xs flex items-center font-semibold text-white"
            >
              <input
                className="mr-2 size-3.5 accent-[#e4b96b]"
                type="radio"
                name="time"
                defaultChecked={index === 0}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => window.alert("준비중입니다")}
        className="type-button-md mt-1 h-10 rounded-[5px] bg-[rgb(228_185_107)] px-5 font-bold text-[#33103f] transition hover:bg-[rgb(235_197_126)]"
      >
        신청하기
      </button>
    </form>
  );
}
