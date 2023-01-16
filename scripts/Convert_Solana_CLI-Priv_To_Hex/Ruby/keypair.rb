require_relative "base58"

def bytes_to_base58(bytes)
  hex = bytes.pack("C*").unpack("H*").first
  Base58.encode(hex)
end

keypair_bytes = [] # Enter key array
private_key_bytes = keypair_bytes[0, 32]
public_key_bytes = keypair_bytes[32..-1]


puts "Keypair:", bytes_to_base58(keypair_bytes)
puts "\nPublic Key:", bytes_to_base58(public_key_bytes)
puts "\nPrivate Key:", bytes_to_base58(private_key_bytes)