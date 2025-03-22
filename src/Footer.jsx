import { FcCopyright } from "react-icons/fc";

function Footer() {
  return (
    <div> {/* copyright-ikoni tekstin edessä */}
      <p className="mt-12 px-4 py-2 bg-purple-400 text-white rounded-lg text-center flex justify-center items-center gap-2">
        <FcCopyright size={20} /> 2025 Muistiinpanoappi - Johanna Lintula -
      </p>
    </div>
  );
}

export default Footer;
