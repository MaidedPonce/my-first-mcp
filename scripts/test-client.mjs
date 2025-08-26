import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const origin = process.argv[2] || "https://my-first-mcp.vercel.app";

async function main() {
  try {
    console.log(`🔗 Intentando conectar a: ${origin}/sse`);
    
    const transport = new SSEClientTransport(new URL(`${origin}/sse`));

    const client = new Client(
      {
        name: "example-client",
        version: "1.0.0",
      },
      {
        capabilities: {
          prompts: {},
          resources: {},
          tools: {},
        },
      }
    );

    console.log("⏳ Iniciando conexión...");
    
    // Agregar timeout de 10 segundos
    const connectPromise = client.connect(transport);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('❌ Timeout: No se pudo conectar en 10 segundos')), 60000);
    });

    await Promise.race([connectPromise, timeoutPromise]);

    console.log("✅ ¡Conectado exitosamente!");
    console.log("📋 Capacidades del servidor:", JSON.stringify(client.getServerCapabilities(), null, 2));

    console.log("🔍 Listando herramientas disponibles...");
    const result = await client.listTools();
    console.log("🛠️ Herramientas:", JSON.stringify(result, null, 2));
    
    // Probar la herramienta
    if (result.tools && result.tools.length > 0) {
      console.log("🧪 Probando herramienta fetch-weather...");
      const weatherResult = await client.callTool({
        name: "fetch-weather",
        arguments: { city: "Madrid" }
      });
      console.log("🌤️ Resultado del clima:", JSON.stringify(weatherResult, null, 2));
    }
    
    // Cerrar conexión
    await client.close();
    console.log("🔌 Conexión cerrada correctamente");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("📋 Detalles:", error);
    process.exit(1);
  }
}

// Agregar handler para Ctrl+C
process.on('SIGINT', () => {
  console.log('\n⚠️ Interrupción detectada, cerrando...');
  process.exit(0);
});

console.log("🚀 Iniciando cliente MCP...");
main().catch((error) => {
  console.error("💥 Error fatal:", error);
  process.exit(1);
});