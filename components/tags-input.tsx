"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { X, Check, Plus } from "lucide-react";
import { useClickOutside } from "@/hooks/use-click-outside";

interface Tag {
  id: string;
  label: string;
  color?: string;
}

interface TagInputProps {
  onChange?: (tags: Tag[]) => void;
  defaultTags?: Tag[];
  suggestions?: Tag[];
  maxTags?: number;
  label?: string;
  placeholder?: string;
  error?: string;
}

const defaultHtmlTag: Tag = {
  id: "html",
  label: "Html",
  color:
    "bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/30",
};

const tagStyles = {
  base: "inline-flex items-center gap-1.5 px-2 py-0.5 text-sm rounded-md transition-colors duration-150",
  colors: {
    blue: "bg-blue-50 text-blue-700 border border-blue-200 hover:border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/30 dark:hover:border-blue-600/50",
    purple:
      "bg-purple-50 text-purple-700 border border-purple-200 hover:border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/30 dark:hover:border-purple-600/50",
    green:
      "bg-green-50 text-green-700 border border-green-200 hover:border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/30 dark:hover:border-green-600/50",
    red: "bg-red-50 text-red-700 border border-red-200 hover:border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/30 dark:hover:border-red-600/50",
  },
};

export default function TagsInput({
  onChange,
  defaultTags = [defaultHtmlTag],
  suggestions = [
    { id: "nextjs", label: "Next.js" },
    { id: "react", label: "React" },
    { id: "tailwind", label: "Tailwind" },
    { id: "nodejs", label: "Node.js" },
    { id: "express", label: "Express" },
    { id: "mongodb", label: "MongoDB" },
    { id: "graphql", label: "GraphQL" },
    { id: "typescript", label: "TypeScript" },
    { id: "redux", label: "Redux" },
    { id: "vue", label: "Vue.js" },
    { id: "angular", label: "Angular" },
    { id: "svelte", label: "Svelte" },
    { id: "python", label: "Python" },
    { id: "django", label: "Django" },
    { id: "flask", label: "Flask" },
    { id: "ruby", label: "Ruby" },
    { id: "rails", label: "Rails" },
    { id: "java", label: "Java" },
    { id: "spring", label: "Spring" },
    { id: "kotlin", label: "Kotlin" },
    { id: "swift", label: "Swift" },
    { id: "objective-c", label: "Objective-C" },
    { id: "flutter", label: "Flutter" },
    { id: "dart", label: "Dart" },
    { id: "go", label: "Go" },
    { id: "rust", label: "Rust" },
    { id: "csharp", label: "C#" },
    { id: "dotnet", label: ".NET" },
    { id: "php", label: "PHP" },
    { id: "laravel", label: "Laravel" },
    { id: "mysql", label: "MySQL" },
    { id: "postgresql", label: "PostgreSQL" },
    { id: "sqlite", label: "SQLite" },
    { id: "redis", label: "Redis" },
    { id: "docker", label: "Docker" },
    { id: "kubernetes", label: "Kubernetes" },
    { id: "aws", label: "AWS" },
    { id: "azure", label: "Azure" },
    { id: "gcp", label: "GCP" },
    { id: "firebase", label: "Firebase" },
    { id: "heroku", label: "Heroku" },
    { id: "digitalocean", label: "DigitalOcean" },
    { id: "netlify", label: "Netlify" },
    { id: "vercel", label: "Vercel" },
    { id: "bootstrap", label: "Bootstrap" },
    { id: "material-ui", label: "Material-UI" },
    { id: "ant-design", label: "Ant Design" },
    { id: "chakra-ui", label: "Chakra UI" },
    { id: "semantic-ui", label: "Semantic UI" },
    { id: "bulma", label: "Bulma" },
    { id: "webpack", label: "Webpack" },
    { id: "vite", label: "Vite" },
    { id: "rollup", label: "Rollup" },
    { id: "parcel", label: "Parcel" },
    { id: "eslint", label: "ESLint" },
    { id: "prettier", label: "Prettier" },
    { id: "jest", label: "Jest" },
    { id: "mocha", label: "Mocha" },
    { id: "cypress", label: "Cypress" },
    { id: "playwright", label: "Playwright" },
    { id: "storybook", label: "Storybook" },
    { id: "pandas", label: "Pandas" },
    { id: "numpy", label: "NumPy" },
    { id: "tensorflow", label: "TensorFlow" },
    { id: "pytorch", label: "PyTorch" },
    { id: "scikit-learn", label: "Scikit-learn" },
    { id: "keras", label: "Keras" },
    { id: "fastapi", label: "FastAPI" },
    { id: "torch", label: "Torch" },
    { id: "openai", label: "OpenAI" },
    { id: "huggingface", label: "Hugging Face" },
    { id: "apache-spark", label: "Apache Spark" },
    { id: "hadoop", label: "Hadoop" },
    { id: "kafka", label: "Kafka" },
    { id: "elastic-search", label: "Elasticsearch" },
    { id: "logstash", label: "Logstash" },
    { id: "grafana", label: "Grafana" },
    { id: "prometheus", label: "Prometheus" },
    { id: "ansible", label: "Ansible" },
    { id: "terraform", label: "Terraform" },
    { id: "puppet", label: "Puppet" },
    { id: "solidity", label: "Solidity" },
    { id: "hardhat", label: "Hardhat" },
    { id: "truffle", label: "Truffle" },
    { id: "web3js", label: "Web3.js" },
    { id: "ethersjs", label: "Ethers.js" },
    { id: "threejs", label: "Three.js" },
    { id: "d3js", label: "D3.js" },
    { id: "chartjs", label: "Chart.js" },
    { id: "cassandra", label: "Cassandra" },
    { id: "couchdb", label: "CouchDB" },
    { id: "dynamodb", label: "DynamoDB" },
    { id: "neo4j", label: "Neo4j" },
    { id: "arangodb", label: "ArangoDB" },
    { id: "couchbase", label: "Couchbase" },
    { id: "influxdb", label: "InfluxDB" },
    { id: "timescaledb", label: "TimescaleDB" },
    { id: "tidb", label: "TiDB" },
    { id: "clickhouse", label: "ClickHouse" },
    { id: "memcached", label: "Memcached" },
    { id: "supabase", label: "Supabase" },
    { id: "vitess", label: "Vitess" },
    { id: "orientdb", label: "OrientDB" },
    { id: "hazelcast", label: "Hazelcast" },
    { id: "db2", label: "DB2" },
    { id: "mariadb", label: "MariaDB" },
    { id: "hbase", label: "HBase" },
    { id: "snowflake", label: "Snowflake" },
    { id: "oracle", label: "Oracle Database" },
    { id: "mssql", label: "Microsoft SQL Server" },
    { id: "amazon-redshift", label: "Amazon Redshift" },
    { id: "greenplum", label: "Greenplum" },
    { id: "bigquery", label: "BigQuery" },
    { id: "ibm-informix", label: "IBM Informix" },
    { id: "teradata", label: "Teradata" },
    { id: "maxcompute", label: "MaxCompute" },
    { id: "yugabytedb", label: "YugabyteDB" },
    { id: "fauna", label: "Fauna" },
    { id: "realm", label: "Realm" },
    { id: "leveldb", label: "LevelDB" },
    { id: "rocksdb", label: "RocksDB" },
    { id: "etcddb", label: "EtcdDB" },
  ],

  maxTags = 10,
  label = "Stack",
  placeholder = "Add stack...",
  error,
}: TagInputProps) {
  const [tags, setTags] = useState<Tag[]>(defaultTags);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions
    .filter(
      (suggestion) =>
        suggestion.label.toLowerCase().includes(input.toLowerCase()) &&
        !tags.find((tag) => tag.id === suggestion.id)
    )
    .slice(0, 5);

  const canAddNewTag =
    !suggestions.find((s) => s.label.toLowerCase() === input.toLowerCase()) &&
    input.length > 0;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onChange?.(newTags);
    } else if (e.key === "Enter" && input) {
      e.preventDefault();
      if (isOpen && filteredSuggestions[selectedIndex]) {
        addTag(filteredSuggestions[selectedIndex]);
      } else if (canAddNewTag) {
        addTag({ id: input, label: input });
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function addTag(tag: Tag) {
    if (tags.length < maxTags) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onChange?.(newTags);
      setInput("");
      setIsOpen(false);
    }
  }

  function removeTag(id: string) {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
    onChange?.(newTags);
  }

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div className="w-full space-y-2" ref={containerRef}>
      <div
        className={cn(
          "min-h-[3rem] sm:min-h-[2.5rem] p-2 sm:p-1.5",
          "rounded-lg border",
          "border-input",
          // "bg-background",
          "focus-within:ring-2 focus-within:ring-ring",
          "flex items-center flex-wrap gap-2 sm:gap-1.5 relative"
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag.id}
            className={cn(
              tagStyles.base,
              "text-base sm:text-sm py-1 sm:py-0.5",
              tag.color || tagStyles.colors.red
            )}
          >
            {tag.label}
            <button
              type="button"
              onClick={() => removeTag(tag.id)}
              className={cn(
                "text-current/60 hover:text-current transition-colors",
                "p-1 sm:p-0"
              )}
            >
              <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className={cn(
            "flex-1 min-w-[140px] sm:min-w-[120px] bg-transparent",
            "h-8 sm:h-7",
            "text-base sm:text-sm",
            "text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none"
          )}
        />

        {isOpen && (input || filteredSuggestions.length > 0) && (
          <div
            className={cn(
              "absolute left-0 right-0 top-full mt-1 z-50",
              "bg-background",
              "max-h-[60vh] sm:max-h-[300px] overflow-y-auto",
              "bg-popover",
              "border border-input",
              "rounded-lg shadow-md",
              "overflow-hidden"
            )}
          >
            <div className="px-2 py-1.5 border-b border-border">
              <span className="text-xs font-medium text-muted-foreground">
                Choose a stack or create one
              </span>
            </div>
            <div className="p-2 sm:p-1.5 flex flex-wrap gap-2 sm:gap-1.5">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  type="button"
                  key={suggestion.id}
                  onClick={() => addTag(suggestion)}
                  className={cn(
                    tagStyles.base,
                    selectedIndex === index
                      ? tagStyles.colors.blue
                      : "bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/80"
                  )}
                >
                  {suggestion.label}
                  {selectedIndex === index && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
              {canAddNewTag && (
                <button
                  type="button"
                  onClick={() => {
                    const colorKeys = Object.keys(tagStyles.colors) as Array<
                      keyof typeof tagStyles.colors
                    >;
                    const randomColor =
                      tagStyles.colors[
                        colorKeys[Math.floor(Math.random() * colorKeys.length)]
                      ];
                    addTag({
                      id: input,
                      label: input,
                      color: randomColor,
                    });
                  }}
                  className={cn(
                    tagStyles.base,
                    selectedIndex === filteredSuggestions.length
                      ? tagStyles.colors.blue
                      : "bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/80"
                  )}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create "{input}"
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
