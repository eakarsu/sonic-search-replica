
interface CodeBlockProps {
  language?: string;
  children: string;
}

const CodeBlock = ({ language = "kotlin", children }: CodeBlockProps) => {
  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
};

export default CodeBlock;
