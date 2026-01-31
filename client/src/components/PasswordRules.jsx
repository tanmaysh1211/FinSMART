export default function PasswordRules({ rules }) {
  const Rule = ({ ok, text }) => (
    <p
      className={`flex items-center gap-2 text-sm ${
        ok ? "text-green-600" : "text-red-500"
      }`}
    >
      {ok ? "✓" : "✕"} {text}
    </p>
  );

  return (
    <div className="mt-3 p-4 rounded-xl bg-red-50 border border-red-200">
      <p className="text-sm font-medium mb-2">Password should be</p>
      <Rule ok={rules.length} text="At least 8 characters long" />
      <Rule ok={rules.number} text="At least 1 number" />
      <Rule ok={rules.lowercase} text="At least 1 lowercase letter" />
      <Rule ok={rules.uppercase} text="At least 1 uppercase letter" />
      <Rule ok={rules.special} text="At least 1 '@' symbol" />
    </div>
  );
}
